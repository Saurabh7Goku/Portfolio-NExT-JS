import React, { useState, useEffect, useRef } from 'react';
import { load as cocoModalLoad } from '@tensorflow-models/coco-ssd';
import AnimatedText from '@/components/AnimatedText';
import TransitionEffect from '@/components/TransitionEffect';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Obj = () => {
    const [detections, setDetections] = useState([]);
    const [video, setVideo] = useState(null);
    const [model, setModel] = useState(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [loadingModel, setLoadingModel] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const lastVideoURLRef = useRef(null);

    const router = useRouter();
    const switchToImgDetection = () => {
        router.push('/ObjectDetection');
    };

    // Load model once on component mount
    useEffect(() => {
        const loadModel = async () => {
            setLoadingModel(true);
            try {
                const loadedModel = await cocoModalLoad();
                setModel(loadedModel);
                setModelLoaded(true);
            } catch (error) {
                console.error("Error loading model:", error);
            } finally {
                setLoadingModel(false);
            }
        };
        loadModel();

        // Cleanup function when component unmounts
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (lastVideoURLRef.current) {
                URL.revokeObjectURL(lastVideoURLRef.current);
            }
        };
    }, []);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!video || !videoRef.current) return;

        // Stop previous detection loop
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        // Clean up previous video URL
        if (lastVideoURLRef.current) {
            URL.revokeObjectURL(lastVideoURLRef.current);
        }

        // Reset detections and states
        setDetections([]);
        setIsDetecting(false);
        setIsPaused(false);

        // Create new object URL for the video
        const url = URL.createObjectURL(video);
        lastVideoURLRef.current = url;

        const videoElement = videoRef.current;
        videoElement.src = url;

        // Wait for video to be loaded before starting detection
        videoElement.onloadeddata = () => {
            if (videoElement.readyState >= 2) {
                videoElement.play();
                setIsDetecting(true);
                startDetection();
            }
        };
    };

    const startDetection = () => {
        if (!isDetecting) return;

        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;

        if (!videoElement || !canvasElement || !model) return;

        // Set up detection loop with proper timing for frame rate control
        let lastFrameTime = 0;
        const targetFrameInterval = 1000 / 30; // Target 30 FPS (adjust to 1000/60 for 60 FPS)

        const detectFrame = async (timestamp) => {
            if (!isDetecting) return;

            // Skip processing if paused
            if (isPaused) {
                animationRef.current = requestAnimationFrame(detectFrame);
                return;
            }

            // Calculate time since last frame
            const elapsed = timestamp - lastFrameTime;

            // Only process frame if enough time has passed for target FPS
            if (elapsed >= targetFrameInterval) {
                lastFrameTime = timestamp;

                if (videoElement.readyState >= 2 && !videoElement.paused && !videoElement.ended) {
                    const ctx = canvasElement.getContext('2d');

                    // Resize canvas to match video dimensions
                    if (canvasElement.width !== videoElement.videoWidth / 2 ||
                        canvasElement.height !== videoElement.videoHeight / 2) {
                        canvasElement.width = videoElement.videoWidth / 2;
                        canvasElement.height = videoElement.videoHeight / 2;
                    }

                    // Clear previous drawings
                    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

                    // Draw current video frame
                    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

                    try {
                        // Run detection
                        const predictions = await model.detect(videoElement);

                        // Update state with new detections
                        setDetections(prevDetections => {
                            // Only update if predictions are different to reduce re-renders
                            if (JSON.stringify(prevDetections) !== JSON.stringify(predictions)) {
                                return predictions;
                            }
                            return prevDetections;
                        });

                        // Draw bounding boxes and labels
                        predictions.forEach(prediction => {
                            const [x, y, width, height] = prediction.bbox;

                            // Draw bounding box
                            ctx.strokeStyle = 'green';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(x / 2, y / 2, width / 2, height / 2);

                            // Draw label background
                            ctx.fillStyle = 'rgba(0, 128, 0, 0.5)';
                            ctx.fillRect(x / 2, y / 2, width / 2, 20);

                            // Draw label text
                            ctx.font = '16px Arial';
                            ctx.fillStyle = 'white';
                            ctx.fillText(prediction.class, x / 2 + 4, y / 2 + 16);
                        });
                    } catch (error) {
                        console.error("Detection error:", error);
                    }
                }
            }

            // Continue detection loop
            animationRef.current = requestAnimationFrame(detectFrame);
        };

        // Start detection loop
        animationRef.current = requestAnimationFrame(detectFrame);
    };

    // Handle toggle pause/resume
    const togglePause = () => {
        const videoElement = videoRef.current;
        if (!videoElement || !isDetecting) return;

        if (isPaused) {
            // Resume video and detection
            videoElement.play();
            setIsPaused(false);
        } else {
            // Pause video and detection
            videoElement.pause();
            setIsPaused(true);
        }
    };

    // Handle stop detection
    const stopDetection = () => {
        // Stop the detection process
        setIsDetecting(false);
        setIsPaused(false);

        // Stop animation frame
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        // Pause video
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.pause();
        }
    };

    // Start/stop detection based on isDetecting state
    useEffect(() => {
        if (isDetecting) {
            startDetection();
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [isDetecting, model, isPaused]);

    // Handle video end
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleVideoEnd = () => {
            setIsDetecting(false);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };

        videoElement.addEventListener('ended', handleVideoEnd);
        return () => {
            videoElement.removeEventListener('ended', handleVideoEnd);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Object Detection In Video</title>
                <meta name='description' content='ML Model for object detection using COCO model.' />
            </Head>
            <TransitionEffect />
            <main className='w-full mb-16 flex flex-col items-center justify-center px-3'>
                <div className='w-full flex items-center justify-evenly'>
                    <AnimatedText text={'Object Detection'} className='!text-5xl font-bold xs:!text-2xl sm:!text-2xl md:text-4xl lg:text-5xl' />
                    <button
                        onClick={switchToImgDetection}
                        className='ml-4 py-1 px-2 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
                    >
                        Switch to Image Detection
                    </button>
                </div>
                <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
                    {loadingModel ? (
                        <p className="text-lg text-gray-600">Loading model...</p>
                    ) : (
                        modelLoaded && (
                            <div className='mb-2'>
                                <div className="flex flex-col items-center">
                                    <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2 sm:w-full mb-4 bg-gray-200 p-6 rounded-lg shadow-md">
                                        <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Choose a video file:</label>
                                        <input
                                            id="videoFile"
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoChange}
                                            className="sm:!text-sm xs:!text-sm md:!text-md block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <div className="flex space-x-2 mt-4">
                                            <button
                                                type="submit"
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                disabled={!video || isDetecting}
                                            >
                                                {isDetecting ? 'Processing...' : 'Submit'}
                                            </button>

                                            {isDetecting && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={togglePause}
                                                        className={`${isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                                    >
                                                        {isPaused ? 'Resume' : 'Pause'}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={stopDetection}
                                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                    >
                                                        Stop
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                <div className="grid grid-cols-2 gap-8 pt-10 w-full xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                    <div className='flex flex-col relative'>
                                        <h4 className='text-xl font-bold flex flex-col items-center pb-2'>Object Video</h4>
                                        <div className="flex flex-col relative w-full h-full">
                                            {video ? (
                                                <>
                                                    <video
                                                        ref={videoRef}
                                                        autoPlay
                                                        muted
                                                        playsInline
                                                        width={500}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <canvas
                                                        ref={canvasRef}
                                                        className="relative top-0 left-0 border-2 border-gray-400 w-full rounded-xl"
                                                    />
                                                    {isPaused && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
                                                            <span className="text-white text-2xl font-bold">PAUSED</span>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="border-2 border-gray-400 w-full rounded-xl min-h-32">
                                                    <p className="p-4 m-2.5 text-lg rounded-lg shadow-lg bg-blue-400">Upload video</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className='text-xl font-bold flex flex-col items-center pb-2'>Object Detected</h4>
                                        <div className="relative overflow-y-auto border-2 border-gray-400 rounded-xl min-h-32">
                                            <div className="sm:p-1 sm:m-1 xs:p-1 xs:m-1 p-2 m-2 max-h-96">
                                                <ul className="w-full h-full">
                                                    {detections.length > 0 ? (
                                                        detections.map((data, index) => (
                                                            <li key={`${data.class}-${index}`} className="mb-4 p-3 rounded-lg shadow-lg bg-blue-400">
                                                                <p className="mb-0">
                                                                    <span className="font-semibold">Object {index + 1}: </span>
                                                                    <span className="capitalize">{data.class}</span>
                                                                </p>
                                                                <p>
                                                                    <span className="font-semibold">Confidence: </span>
                                                                    <span>{Math.abs(data.score * 100).toFixed(2)}%</span>
                                                                </p>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="p-3 rounded-lg shadow-lg bg-blue-400">
                                                            <p>
                                                                {isDetecting && !isPaused ? 'Processing...' :
                                                                    isPaused ? 'Detection paused' :
                                                                        'No Results Found'}
                                                            </p>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </main>
        </>
    );
};

export default Obj;