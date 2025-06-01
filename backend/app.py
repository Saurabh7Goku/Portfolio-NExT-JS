# import cv2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import os
import tempfile
import logging
import requests
import json
from pdf2image import convert_from_path
import pytesseract
import numpy as np
from werkzeug.utils import secure_filename
import threading
import time

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB max file size

# Gemini API Configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  # Set this environment variable

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent"

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Global variables for async processing
processing_status = {}
processing_results = {}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_ocr(file_path, task_id=None):
    """Extract text using OCR for image-based PDFs or scanned documents"""
    try:
        if task_id:
            processing_status[task_id] = {"status": "processing", "progress": "Starting OCR..."}
        
        logger.info("Starting OCR text extraction...")
        
        # Convert PDF to images with optimized settings
        images = convert_from_path(
            file_path, 
            # dpi=200,  # Reduced from 300 for faster processing
            # fmt='jpeg',
            # thread_count=2  # Limit thread count to prevent resource issues
        )
        logger.info(f"Converted PDF to {len(images)} images")
        
        if task_id:
            processing_status[task_id]["progress"] = f"Processing {len(images)} pages..."
        
        extracted_text = ''
        for i, image in enumerate(images):
            try:
                if task_id:
                    processing_status[task_id]["progress"] = f"Processing page {i+1}/{len(images)}"
                
                    # image = cv2.imread('input_image.png')
                    # image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                    # image = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
                    # image = cv2.GaussianBlur(image, (3, 3), 0)

                # Optimized OCR configuration
                page_text = pytesseract.image_to_string(
                    image,
                    lang='hin+eng',  # Hindi
                    config='--oem 3 --psm 3'
                )
                
                extracted_text += page_text
                
                logger.info(f"Page {i+1} OCR complete - extracted {len(page_text)} characters")
                
                # Add small delay to prevent overwhelming the system
                time.sleep(0.1)
                
            except Exception as page_error:
                logger.error(f"OCR failed for page {i+1}: {str(page_error)}")
                continue
        
        if extracted_text.strip():
            logger.info(f"OCR extraction successful - total {len(extracted_text)} characters")
            if task_id:
                processing_status[task_id] = {"status": "completed", "progress": "OCR completed successfully"}
                processing_results[task_id] = extracted_text
            return extracted_text
        else:
            logger.warning("OCR extraction completed but no text found")
            if task_id:
                processing_status[task_id] = {"status": "failed", "progress": "No text found in PDF"}
            return None
            
    except Exception as e:
        logger.error(f"OCR extraction failed: {str(e)}")
        if task_id:
            processing_status[task_id] = {"status": "failed", "progress": f"Error: {str(e)}"}
        return None

def process_pdf_async(file_path, task_id):
    """Process PDF asynchronously to avoid timeout issues"""
    try:
        result = extract_text_ocr(file_path, task_id)
        processing_results[task_id] = result
    except Exception as e:
        logger.error(f"Async processing failed: {str(e)}")
        processing_status[task_id] = {"status": "failed", "progress": f"Processing failed: {str(e)}"}
    finally:
        # Clean up temporary file
        try:
            if os.path.exists(file_path):
                os.unlink(file_path)
        except OSError:
            pass

def call_gemini_api(prompt, pdf_context=""):
    """Call Gemini API with the user prompt and PDF context"""
    try:
        if not GEMINI_API_KEY:
            return {"error": "Gemini API key not configured"}
        
        # Prepare the context prompt
        if pdf_context:
            context_prompt = f"""Context from PDF document:
{pdf_context}

User question: {prompt}

Please answer the user's question based on the PDF context provided above. Please respond in the same language as the user's question when possible."""
        else:
            context_prompt = prompt
        
        # Prepare the request payload
        payload = {
            "contents": [{
                "parts": [{
                    "text": context_prompt
                }]
            }],
            "generationConfig": {
                "temperature": 0.7,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 1024,
            }
        }
        
        # Make the API request
        headers = {
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            headers=headers,
            json=payload,
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            ai_response = data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', 'No response generated')
            return {"success": True, "response": ai_response}
        else:
            logger.error(f"Gemini API error: {response.status_code} - {response.text}")
            return {"error": f"API request failed with status {response.status_code}"}
            
    except requests.exceptions.Timeout:
        return {"error": "Request timeout - please try again"}
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        return {"error": "Network error occurred"}
    except Exception as e:
        logger.error(f"Gemini API call failed: {str(e)}")
        return {"error": f"API call failed: {str(e)}"}

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "message": "Hindi PDF Extraction Server is running",
        "endpoints": [
            "GET /health",
            "POST /extract-pdf",
            "POST /extract-pdf-sync",
            "GET /check-status/<task_id>",
            "POST /chat",
            "POST /test-gemini"
        ]
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    gemini_status = "configured" if GEMINI_API_KEY else "not configured"
    return jsonify({
        'status': 'healthy', 
        'message': 'PDF extraction service is running',
        'gemini_api': gemini_status,
        'active_tasks': len(processing_status)
    })

@app.route('/extract-pdf', methods=['POST'])
def extract_pdf():
    """Extract text from uploaded PDF file using OCR - Async version"""
    try:
        # Check if file is present in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check file extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed'}), 400
        
        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({'error': 'File too large. Maximum size is 16MB'}), 400
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            file.save(temp_file.name)
            temp_file_path = temp_file.name
        
        # Generate task ID
        task_id = f"task_{int(time.time() * 1000)}"
        processing_status[task_id] = {"status": "queued", "progress": "Queued for processing..."}
        
        # Start async processing
        thread = threading.Thread(target=process_pdf_async, args=(temp_file_path, task_id))
        thread.daemon = True
        thread.start()
        
        logger.info(f"Started async PDF processing with task ID: {task_id}")
        
        return jsonify({
            'success': True,
            'task_id': task_id,
            'message': 'PDF processing started. Use /check-status endpoint to check progress.',
            'filename': secure_filename(file.filename),
            'processing_mode': 'async'
        })
                
    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}")
        return jsonify({'error': f'Internal server error while processing PDF: {str(e)}'}), 500

@app.route('/check-status/<task_id>', methods=['GET'])
def check_status(task_id):
    """Check the status of PDF processing"""
    try:
        if task_id not in processing_status:
            return jsonify({'error': 'Task not found'}), 404
        
        status_info = processing_status[task_id]
        response = {
            'task_id': task_id,
            'status': status_info['status'],
            'progress': status_info['progress']
        }
        
        # If completed, include the result
        if status_info['status'] == 'completed' and task_id in processing_results:
            response['text'] = processing_results[task_id]
            response['text_length'] = len(processing_results[task_id])
            response['extraction_method'] = 'OCR + Text extraction (Async)'
            
            # Clean up completed task
            del processing_status[task_id]
            del processing_results[task_id]
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error checking status: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/extract-pdf-sync', methods=['POST'])
def extract_pdf_sync():
    """Synchronous PDF extraction - for smaller files"""
    try:
        # Check if file is present in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check file extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed'}), 400
        
        # Check file size - smaller limit for sync processing
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > 8 * 1024 * 1024:  # 8MB max for sync
            return jsonify({'error': 'File too large for sync processing. Maximum size is 8MB. Use async endpoint for larger files.'}), 400
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            file.save(temp_file.name)
            temp_file_path = temp_file.name
        
        try:
            # Extract text from PDF using OCR
            extracted_text = extract_text_ocr(temp_file_path)
            
            if extracted_text is None or not extracted_text.strip():
                return jsonify({
                    'error': 'Could not extract text from PDF. The PDF might be empty, corrupted, or contain only images without recognizable text.'
                }), 400
            
            logger.info(f"Successfully extracted {len(extracted_text)} characters from PDF: {file.filename}")
            
            return jsonify({
                'success': True,
                'text': extracted_text,
                'filename': secure_filename(file.filename),
                'text_length': len(extracted_text),
                'extraction_method': 'OCR + Text extraction (Sync)'
            })
            
        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_file_path)
            except OSError:
                pass
                
    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}")
        return jsonify({'error': f'Internal server error while processing PDF: {str(e)}'}), 500

@app.route('/chat', methods=['POST'])
def chat_with_context():
    """Handle chat requests with PDF context using Gemini API"""
    try:
        data = request.json
        user_message = data.get('message', '')
        pdf_context = data.get('pdf_context', '')
        
        if not user_message.strip():
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        logger.info(f"Processing chat request with message length: {len(user_message)}")
        logger.info(f"PDF context length: {len(pdf_context) if pdf_context else 0}")
        
        # Call Gemini API
        api_result = call_gemini_api(user_message, pdf_context)
        
        if api_result.get('error'):
            return jsonify({
                'error': api_result['error']
            }), 500
        
        return jsonify({
            'success': True,
            'response': api_result['response'],
            'message': user_message,
            'context_used': bool(pdf_context),
            'context_length': len(pdf_context) if pdf_context else 0
        })
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/test-gemini', methods=['POST'])
def test_gemini():
    """Test endpoint for Gemini API"""
    try:
        data = request.json
        test_message = data.get('message', 'Hello, this is a test message.')
        
        result = call_gemini_api(test_message)
        
        if result.get('error'):
            return jsonify({'error': result['error']}), 500
        
        return jsonify({
            'success': True,
            'response': result['response'],
            'test_message': test_message
        })
        
    except Exception as e:
        logger.error(f"Error in test endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("Starting Hindi PDF Extraction Server...")
    print("Server will run on http://localhost:5000")
    print("Endpoints:")
    print("  GET  /health - Health check")
    print("  POST /extract-pdf - Extract text from PDF (Async)")
    print("  POST /extract-pdf-sync - Extract text from PDF (Sync - max 8MB)")
    print("  GET  /check-status/<task_id> - Check async processing status")
    print("  POST /chat - Chat with PDF context")
    print("  POST /test-gemini - Test Gemini API connection")
    
    if not GEMINI_API_KEY:
        print("\n⚠️  WARNING: GEMINI_API_KEY environment variable not set!")
        print("Set it using: export GEMINI_API_KEY=your_api_key_here")
    else:
        print("✅ Gemini API key configured")
    
    # IMPORTANT: Disable debug mode and reloader for production
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)