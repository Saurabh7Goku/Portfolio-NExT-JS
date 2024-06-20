import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as tf from '@tensorflow/tfjs';
import { load as cocoModalLoad } from '@tensorflow-models/coco-ssd';
import Loader from '@/components/Loader';
import AnimatedText from '@/components/AnimatedText';
import TransitionEffect from '@/components/TransitionEffect';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Obj from './Obj';


function ObjectDetection() {
    const canvasEle = useRef(null);
    const imageEle = useRef(null);
    const [objectDetector, setObjectDetectors] = useState(null);
    const [detectedObjects, setDetectedObjects] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const switchToVideoDetection = () => {

        router.push('/Obj');
    };

    const draw = (ctx, objects) => {
        canvasEle.current.width = imageEle.current.width;
        canvasEle.current.height = imageEle.current.height;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, imageEle.current.width, imageEle.current.height);
        ctx.drawImage(
            imageEle.current,
            0,
            0,
            imageEle.current.width,
            imageEle.current.height
        );
        for (let i = 0; i < objects.length; i += 1) {
            ctx.fillStyle = 'rgba(0, 128, 0, 0.5)';
            ctx.strokeStyle = 'white';
            ctx.fillRect(
                objects[i].bbox[0],
                objects[i].bbox[1],
                objects[i].bbox[2],
                20
            );
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(
                objects[i].class,
                objects[i].bbox[0] + 4,
                objects[i].bbox[1] + 16
            );
            ctx.beginPath();
            ctx.rect(
                objects[i].bbox[0],
                objects[i].bbox[1],
                objects[i].bbox[2],
                objects[i].bbox[3]
            );
            ctx.strokeStyle = 'green';
            ctx.stroke();
            ctx.closePath();
        }
    };

    const startDetecting = async () => {
        const image = tf.browser.fromPixels(imageEle.current);
        const predictions = await objectDetector.detect(image);
        setDetectedObjects(predictions);
        if (predictions && canvasEle.current) {
            draw(canvasEle.current.getContext('2d'), predictions);
        }
    };

    const loadOCRModel = async () => {
        const model = await cocoModalLoad();
        setObjectDetectors(model);
        setIsLoading(false);
    };

    useEffect(() => {
        loadOCRModel();
    }, []);

    const setImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            if (canvasEle.current) {
                const canvas = canvasEle.current.getContext('2d');
                canvas.reset();
            }
            setUploadedImage(URL.createObjectURL(image));
        }
    };

    return (
        <>
            <Loader
                loading={isLoading}
                text={'Please wait while the model is loading...'}
            />
            <Head>
                <title>Saurabh | Object-Detection</title>
                <meta name='description' content='ML Model for object detection using COCO model.' />
            </Head>
            <TransitionEffect />
            <main className='w-full mb-16 flex flex-col items-center justify-center px-3'>
                <div className='w-full flex items-center justify-between'>
                    <AnimatedText text={'Object Detection'} className='!text-5xl font-bold xs:!text-2xl sm:!text-2xl md:text-4xl lg:text-5xl' />
                    <button
                        onClick={switchToVideoDetection}
                        className='xs:!text-sm sm:!text-sm ml-4 py-1 px-4 bg-red-500 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
                    >
                        Switch to Video Detection
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-10 w-full xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    <div className="flex flex-col justify-center items-center p-5 shadow-lg rounded-lg bg-gradient-to-r from-blue-300 to-blue-200">
                        <div className="w-full min-h-[500px] h-full rounded-lg shadow-inner mb-8 relative">
                            {uploadedImage && (
                                <>
                                    <Image
                                        ref={imageEle}
                                        src={uploadedImage}
                                        alt="sample image"
                                        width={500}
                                        height={500}
                                        style={{ objectFit: 'fill' }}
                                        className="absolute w-full h-full rounded-lg"
                                    />
                                    <canvas
                                        ref={canvasEle}
                                        className="absolute w-full h-full rounded-lg"
                                        width={500}
                                        height={500}
                                    />
                                </>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="fileSelect"
                                className="p-3.5 px-8 rounded-[40px] bg-blue-500 text-black font-semibold border-none cursor-pointer transition-all duration-200 transform hover:translate-y-1"
                            >
                                <span>
                                    <i className="bi bi-upload"></i>
                                </span>
                                Upload an image
                            </label>
                            <input id="fileSelect" type="file" onChange={setImage} hidden />
                        </div>
                        {uploadedImage && (
                            <button
                                className="p-3.5 px-8 rounded-[40px] bg-blue-500 text-black font-semibold border-none cursor-pointer transition-all duration-200 transform hover:translate-y-1 mt-4"
                                onClick={startDetecting}
                            >
                                Start detection
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col justify-start items-center p-5 shadow-lg rounded-lg bg-gradient-to-r from-blue-300 to-blue-200 h-full max-h-[80vh] overflow-y-auto">
                        <h3 className="text-3xl font-bold border-2 border-dashed border-black rounded-[20px] p-2">Results</h3>
                        <ul className="mt-5 w-full">
                            {detectedObjects.length > 0 ? (
                                detectedObjects.map((data, index) => (
                                    <li key={`${data.label}-${index}`} className="w-full mt-0 mb-5 p-5 rounded-lg shadow-lg bg-blue-400">
                                        <p className="mb-0">
                                            <label className="font-semibold">Object {index + 1}</label>: <span className="capitalize">{data.class}</span>
                                        </p>
                                        <p>
                                            <label className="font-semibold">Confidence</label>: <span>{Math.abs(data.score * 100).toFixed(2)}%</span>
                                        </p>
                                    </li>
                                ))
                            ) : (
                                imageEle.current && (
                                    <li>
                                        <p>No Result Found</p>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ObjectDetection;
