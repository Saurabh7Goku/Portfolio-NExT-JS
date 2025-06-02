# # Use official lightweight Python image
# FROM python:3.11-slim

# # Install system dependencies for Tesseract and Poppler
# RUN apt-get update && apt-get install -y \
#     tesseract-ocr \
#     libtesseract-dev \
#     libleptonica-dev \
#     poppler-utils \
#     && rm -rf /var/lib/apt/lists/*

# # Set working directory inside container
# WORKDIR /app

# # Copy requirements.txt and install Python dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy your app code
# COPY . .

# # Expose port (Render uses $PORT env variable but best to keep default 5000)
# EXPOSE 5000

# # Tell Flask to listen on all interfaces on port 5000
# ENV FLASK_RUN_HOST=0.0.0.0
# ENV FLASK_RUN_PORT=5000

# # Command to run your Flask app with gunicorn
# # CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--workers", "2"]
# CMD ["sh", "-c", "gunicorn app:app --bind 0.0.0.0:${PORT:-10000} --workers 1 --timeout 180"]


#-------------------------------------------------------------------------------------------------------


# fly.io Deployment

# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (FastAPI default)
EXPOSE 8000

# Start server (FastAPI)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
