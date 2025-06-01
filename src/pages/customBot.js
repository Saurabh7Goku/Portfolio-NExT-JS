import { useState, useRef, useEffect, createContext } from 'react';
import Head from 'next/head';
import TransitionEffect from '@/components/TransitionEffect';


// Create context for PDF text
const PdfContext = createContext({ pdfText: '', setPdfText: () => { } });

export const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [pdfText, setPdfText] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [backendStatus, setBackendStatus] = useState('checking');
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [processingProgress, setProcessingProgress] = useState('');
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const statusCheckInterval = useRef(null);

    // Backend server URL - change this to your backend URL
    const BACKEND_URL = 'https://portfolio-next-js-3kgl.onrender.com';

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const checkProcessingStatus = async (taskId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/check-status/${taskId}`);
            const data = await response.json();

            if (response.ok) {
                setProcessingProgress(data.progress);

                if (data.status === 'completed') {
                    // Processing completed
                    setPdfText(data.text);
                    setMessages(prev => [
                        ...prev,
                        {
                            text: `PDF text extracted successfully! ✅\nExtracted ${data.text_length} characters\nMethod: ${data.extraction_method}`,
                            isUser: false,
                            type: 'success'
                        }
                    ]);
                    setIsUploading(false);
                    setCurrentTaskId(null);
                    setProcessingProgress('');

                    // Clear interval
                    if (statusCheckInterval.current) {
                        clearInterval(statusCheckInterval.current);
                        statusCheckInterval.current = null;
                    }
                } else if (data.status === 'failed') {
                    // Processing failed
                    setMessages(prev => [
                        ...prev,
                        {
                            text: `PDF processing failed: ${data.progress}`,
                            isUser: false,
                            type: 'error'
                        }
                    ]);
                    setIsUploading(false);
                    setCurrentTaskId(null);
                    setProcessingProgress('');

                    // Clear interval
                    if (statusCheckInterval.current) {
                        clearInterval(statusCheckInterval.current);
                        statusCheckInterval.current = null;
                    }
                }
                // If status is 'processing' or 'queued', continue checking
            } else {
                console.error('Status check failed:', data.error);
            }
        } catch (error) {
            console.error('Status check error:', error);
        }
    };

    const startStatusChecking = (taskId) => {
        if (statusCheckInterval.current) {
            clearInterval(statusCheckInterval.current);
        }

        statusCheckInterval.current = setInterval(() => {
            checkProcessingStatus(taskId);
        }, 2000); // Check every 2 seconds
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setMessages(prev => [...prev, { text: 'Please upload a valid PDF file.', isUser: false, type: 'error' }]);
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        const useAsync = fileSizeMB > 8; // Use async for files larger than 8MB

        setIsUploading(true);
        setMessages(prev => [...prev, {
            text: `Uploading PDF: ${file.name} (${fileSizeMB.toFixed(1)}MB)\nProcessing mode: ${useAsync ? 'Async (large file)' : 'Sync (small file)'}`,
            isUser: true
        }]);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const endpoint = useAsync ? '/extract-pdf' : '/extract-pdf-sync';
            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (useAsync) {
                    // Async processing - start status checking
                    setCurrentTaskId(data.task_id);
                    setProcessingProgress('PDF processing started...');
                    setMessages(prev => [
                        ...prev,
                        {
                            text: `PDF upload successful! ✅\nTask ID: ${data.task_id}\nProcessing started asynchronously...`,
                            isUser: false,
                            type: 'info'
                        }
                    ]);
                    startStatusChecking(data.task_id);
                } else {
                    // Sync processing - immediate result
                    setPdfText(data.text);
                    setMessages(prev => [
                        ...prev,
                        {
                            text: `PDF text extracted successfully! ✅\nExtracted ${data.text_length} characters from "${data.filename}"\nMethod: ${data.extraction_method}`,
                            isUser: false,
                            type: 'success'
                        }
                    ]);
                    setIsUploading(false);
                }
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        text: `Error extracting PDF: ${data.error || 'Unknown error'}`,
                        isUser: false,
                        type: 'error'
                    }
                ]);
                setIsUploading(false);
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessages(prev => [
                ...prev,
                {
                    text: 'Error uploading file. Please make sure the backend server is running.',
                    isUser: false,
                    type: 'error'
                }
            ]);
            setIsUploading(false);
        } finally {
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInput('');
        setIsLoading(true);

        try {
            // Send request to backend which will handle Gemini API
            const response = await fetch(`${BACKEND_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    pdf_context: pdfText
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setMessages(prev => [...prev, {
                    text: data.response,
                    isUser: false,
                    type: 'ai_response'
                }]);
            } else {
                setMessages(prev => [...prev, {
                    text: `Error: ${data.error}`,
                    isUser: false,
                    type: 'error'
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                text: 'Error contacting AI service. Please check if the backend server is running and configured properly.',
                isUser: false,
                type: 'error'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading && input.trim()) {
                handleSendMessage();
            }
        }
    };

    const cancelProcessing = () => {
        if (statusCheckInterval.current) {
            clearInterval(statusCheckInterval.current);
            statusCheckInterval.current = null;
        }
        setIsUploading(false);
        setCurrentTaskId(null);
        setProcessingProgress('');
        setMessages(prev => [...prev, {
            text: 'Processing cancelled by user.',
            isUser: false,
            type: 'info'
        }]);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Check backend health on component mount
    useEffect(() => {
        const checkBackendHealth = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/health`);
                if (response.ok) {
                    const data = await response.json();
                    setBackendStatus('connected');
                    console.log('Backend server is running:', data);

                    // Show initial message if chat is empty
                    if (messages.length === 0) {
                        setMessages([{
                            text: `Welcome! 👋\n\nBackend server is connected and ready.\nAdv. AI: ${data.gemini_api}\nUpload a PDF document to get started!\n\n\n📁 Files ≤8MB: Processed instantly⏳`,
                            isUser: false,
                            type: 'system'
                        }]);
                    }
                } else {
                    setBackendStatus('error');
                    console.warn('Backend server health check failed');
                }
            } catch (error) {
                setBackendStatus('error');
                console.warn('Backend server is not accessible:', error.message);
                if (messages.length === 0) {
                    setMessages([{
                        text: `⚠️ Cannot connect to backend server.\n\nPlease make sure:\n1. Backend server is running on ${BACKEND_URL}\n2. GEMINI_API_KEY is set as environment variable\n3. All dependencies are installed\n4. Debug mode is disabled (use_reloader=False)`,
                        isUser: false,
                        type: 'error'
                    }]);
                }
            }
        };

        checkBackendHealth();

        // Cleanup interval on unmount
        return () => {
            if (statusCheckInterval.current) {
                clearInterval(statusCheckInterval.current);
            }
        };
    }, []);

    const getMessageStyle = (message) => {
        if (message.isUser) {
            return 'bg-blue-500 text-white';
        }

        switch (message.type) {
            case 'error':
                return 'bg-red-50 text-red-800 border border-red-200';
            case 'success':
                return 'bg-green-50 text-green-800 border border-green-200';
            case 'system':
                return 'bg-blue-50 text-blue-800 border border-blue-200';
            case 'info':
                return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
            case 'ai_response':
                return 'bg-white text-gray-900 shadow-sm border';
            default:
                return 'bg-white text-gray-900 shadow-sm border';
        }
    };

    const getStatusColor = () => {
        switch (backendStatus) {
            case 'connected': return 'text-green-600';
            case 'error': return 'text-red-600';
            default: return 'text-yellow-600';
        }
    };

    const getStatusText = () => {
        switch (backendStatus) {
            case 'connected': return 'Connected ✅';
            case 'error': return 'Disconnected ❌';
            default: return 'Checking...';
        }
    };

    return (
        <><Head>
            <title>Saurabh | Custom AI-Chat</title>
            <meta name='description' content='any description' />
        </Head>
            <TransitionEffect />
            <PdfContext.Provider value={{ pdfText, setPdfText }}>
                <div className="max-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center w-full pt-0">
                    {/* Main content area with instructions */}
                    <div className="min-h-screen text-center p-10 w-full pt-20">
                        <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-lg mb-4 sm:mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                            <span className="text-xs sm:text-sm font-medium text-gray-600">AI-Powered Document Assistant</span>
                        </div>
                        <h1 className="text-5xl sm:text-xl md:text-4xl font-extrabold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                            Hindi PDF Chat Assistant
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 font-medium ">
                            Upload a PDF document (including Hindi text) and chat with it using AI
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-3 mb-10">
                            {/* Status Card */}
                            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                                <div className="space-y-3 text-left text-gray-300">
                                    <div className="flex justify-between">
                                        <span>Backend:</span>
                                        <span className={getStatusColor()}>{getStatusText()}</span>
                                    </div>
                                    {pdfText && (
                                        <div className="flex justify-between">
                                            <span>PDF:</span>
                                            <span className="text-green-400">Loaded ({pdfText.length} chars) ✅</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Instructions Card */}
                            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">How to Use</h3>
                                <ol className="text-left space-y-3 text-sm text-gray-300">
                                    <li>1. Click the chat button below</li>
                                    <li>2. Upload your PDF document</li>
                                    <li>3. Ask questions about your document</li>
                                    <li>4. Get AI-powered responses</li>
                                </ol>
                            </div>
                        </div>

                        {pdfText && (
                            <div className="bg-green-900 bg-opacity-70 backdrop-blur-md border border-green-500 text-green-100 px-6 py-4 rounded-2xl mb-10 max-w-2xl mx-auto">
                                <strong>PDF Loaded Successfully!</strong><br />
                                <span className="text-sm">
                                    {pdfText.length} characters extracted • Ready for questions
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Chat Toggle Button */}
                    <button
                        onClick={toggleChat}
                        className="fixed right-6 bottom-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5 rounded-full shadow-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:scale-110 focus:outline-none"
                        title="Open Chat"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </button>

                    {/* Chatbox */}
                    <div
                        className={`fixed right-0 bottom-20 w-96 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-2xl rounded-l-2xl transform transition-transform duration-500 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        {/* Chat Header */}
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tl-2xl">
                            <div>
                                <h2 className="text-lg font-semibold">Chat Assistant</h2>
                                <p className="text-xs opacity-90">
                                    {pdfText ? `PDF loaded (${Math.round(pdfText.length / 1000)}k chars) ✅` : 'No PDF loaded'}
                                </p>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="focus:outline-none hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                                title="Close Chat"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-900 bg-opacity-80">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-in`}
                                >
                                    <div
                                        className={`max-w-xs p-3 rounded-xl whitespace-pre-wrap text-sm ${getMessageStyle(message)}`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}

                            {(isUploading || isLoading) && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 text-gray-200 shadow-md border border-gray-700 p-3 rounded-xl">
                                        <div className="flex items-center space-x-2">
                                            <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                                            <span className="text-sm">
                                                {isUploading ? 'Processing PDF...' : 'AI is thinking...'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input and Upload */}
                        <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-bl-2xl">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    disabled={isUploading} />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading || backendStatus !== 'connected'}
                                    className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    title="Upload PDF"
                                >
                                    {isUploading ? (
                                        <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-transparent rounded-full"></div>
                                    ) : (
                                        <svg
                                            className="w-5 h-5 text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    )}
                                </button>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={isLoading || backendStatus !== 'connected'}
                                    className="flex-1 p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none placeholder-gray-400"
                                    placeholder="Type your message..."
                                    rows="1"
                                    style={{ minHeight: '40px', maxHeight: '100px' }} />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !input.trim() || backendStatus !== 'connected'}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    title="Send Message"
                                >
                                    {isLoading ? (
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {backendStatus !== 'connected' && (
                                <p className="text-xs text-red-400 mt-2">
                                    Backend not connected. Check server status.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
            </PdfContext.Provider>
        </>
    );
}
export default Chatbot;