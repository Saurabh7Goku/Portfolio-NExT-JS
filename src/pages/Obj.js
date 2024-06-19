import React, { useState, useEffect, useRef } from 'react';
import { load as cocoModalLoad } from '@tensorflow-models/coco-ssd';
import AnimatedText from '@/components/AnimatedText';
import TransitionEffect from '@/components/TransitionEffect';
import Head from 'next/head';
import { useRouter } from 'next/router'

const Obj = () => {
    const [detections, setDetections] = useState([]);
    const [video, setVideo] = useState(null);
    const [model, setModel] = useState(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [loadingModel, setLoadingModel] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const router = useRouter();
    const switchToVideoDetection = () => {
        router.push('/ObjectDetection');
    };

    useEffect(() => {
        const loadModel = async () => {
            setLoadingModel(true);
            const model = await cocoModalLoad();
            setModel(model);
            setModelLoaded(true);
            setLoadingModel(false);
        };
        loadModel();
    }, []);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const videoElement = videoRef.current;
        if (video && videoElement) {
            const url = URL.createObjectURL(video);
            videoElement.src = url;
            videoElement.addEventListener('loadeddata', () => {
                detectObjects();
            });
            videoElement.play();
        }
    };

    const detectObjects = async () => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        if (model && videoElement && videoElement.readyState === 4) {
            const ctx = canvasElement.getContext('2d');
            canvasElement.width = videoElement.videoWidth / 2;
            canvasElement.height = videoElement.videoHeight / 2;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(videoElement, 0, 0, ctx.canvas.width, ctx.canvas.height);

            const predictions = await model.detect(videoElement);
            setDetections(predictions);

            predictions.forEach(prediction => {
                const [x, y, width, height] = prediction.bbox;
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 2;
                ctx.strokeRect(x / 2, y / 2, width / 2, height / 2);

                ctx.fillStyle = 'rgba(0, 128, 0, 0.5)';
                ctx.fillRect(x / 2, y / 2, width / 2, 20);

                ctx.font = '16px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(prediction.class, x / 2 + 4, y / 2 + 16);
            });

            requestAnimationFrame(detectObjects);
        }


    };

    return (
        <>
            <Head>
                <title>Saurabh | Object-Detection-In Video</title>
                <meta name='description' content='ML Model for object detection using COCO model.' />
            </Head>
            <TransitionEffect />
            <main className='w-full mb-16 flex flex-col items-center justify-center px-3'>
                <div className='w-full flex items-center justify-between'>
                    <AnimatedText text={'Object Detection'} className='!text-5xl font-bold xs:text-2xl sm:text-2xl md:text-4xl lg:text-5xl' />
                    <button
                        onClick={switchToVideoDetection}
                        className='ml-4 py-1 px-4 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
                    >
                        Switch to Video Detection
                    </button>
                </div>
                <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
                    {loadingModel ? (
                        <p className="text-lg text-gray-600">Loading model...</p>
                    ) : (
                        modelLoaded && (
                            <div className='mb-auto'>
                                <div className="flex flex-col items-center">
                                    <form onSubmit={handleSubmit} className=" flex flex-col items-center w-1/2 mb-4 bg-gray-200 p-6 rounded-lg shadow-md">
                                        <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Choose a video file:</label>
                                        <input
                                            id="videoFile"
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoChange}
                                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                                <div className="grid grid-cols-2 gap-8 pt-10 w-full xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                    <div className="relative w-full h-full">
                                        {video ? (
                                            <>
                                                <video
                                                    ref={videoRef}
                                                    autoPlay
                                                    muted
                                                    hidden
                                                />
                                                <canvas
                                                    ref={canvasRef}
                                                    className="absolute top-0 left-0 border-2 border-gray-400 w-full rounded-xl"
                                                />
                                            </>
                                        ) : (
                                            <div className="h-full border-2 border-gray-400 w-full rounded-xl p-3 m-2">
                                                <p className="text-lg p-3 rounded-lg shadow-lg bg-blue-400">Upload video</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative overflow-y-auto border-2 border-gray-400 rounded-xl">
                                        <div className="p-3 m-2">
                                            <ul className="w-full h-80">
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
                                                        <p>No Result Found</p>
                                                    </li>
                                                )}
                                            </ul>
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
