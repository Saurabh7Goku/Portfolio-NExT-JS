import React, { useRef } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { motion, useMotionValue, useScroll } from 'framer-motion';
import preRajya from '../../public/images/articles/preRajya.png';
import u14 from '../../public/images/articles/football-14.png';
import u17 from '../../public/images/articles/football-17.png';
import Rajya from '../../public/images/articles/RajyaPuraskar.png';
import tritiya from '../../public/images/articles/trityaSopan.png';
import TransitionEffect from '@/components/TransitionEffect';

const FramerImage = motion(Image);

const MotionPicture = ({ title, img, link }) => {

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const imgRef = useRef(null);

    function handleMouse(event) {
        imgRef.current.style.display = "inline-block";
        x.set(event.pageX);
        y.set(-10);
    }

    function handleMouseLeave(event) {
        imgRef.current.style.display = "none";
        x.set(0);
        y.set(0);
    }

    return (
        <Link href={link} target='_blank'
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
        >
            <h2 className='capitalize text-xl font-semibold hover:underline xs:text-xs sm:text-sm md:text-base'>{title}</h2>
            <FramerImage
                style={{ x: x, y: y }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
                ref={imgRef} src={img} alt={title} className='z-10 w-96 h-auto hidden absolute rounded-lg xs:w-[50%]' />
        </Link>
    )
}

const Achievement = ({ img, title, date, link }) => {
    return (
        <motion.li
            initial={{ y: 200 }}
            whileInView={{ y: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            viewport={{ once: true }}
            className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center
        justify-between bg-light text-dark first: mt-0 border border-solid border-dark
        border-r-4 border-b-4 xs:text-sm sm:text-sm md:text-base'>

            <MotionPicture title={title} img={img} link={link} className="xs:text-sm sm:text-sm md:text-base" />
            <span className='text-pink-600 font-semibold pl-4'>
                {date}
            </span>
        </motion.li>
    )
}
const awards = [
    {
        image: '/images/articles/hackathon.jpg',
        title: 'Smart India Hackathon (Violence Detection)'
    },
    {
        image: '/images/articles/tensorflowDev.png',
        title: 'Tensorflow Developer by Udemy',
    },
    {
        image: '/images/articles/DataScience.png',
        title: 'Data Science by Udemy',
    },
    {
        image: '/images/articles/googledev-computer-vision.png',
        title: 'Computer Vision by Google Developer Club',
    },
    {
        image: '/images/articles/Dev-town MachineLearning.png',
        title: 'ML by Google Developer Club',
    },
    {
        image: '/images/articles/Udemy-CNN.png',
        title: 'Convulotional Neural Net. by Udemy',
    },
    {
        image: '/images/articles/ShapeAIWebDev.png',
        title: 'Web Development by AWS Student Club (ShapeAI)',
    },
    {
        image: '/images/articles/bits_mishra_webDEV.png',
        title: 'Frontend Developer by Google Dev. Club (Bits Mishra)',
    },
    {
        image: '/images/articles/DevTowns_WebDev.png',
        title: 'Web Development by Dev Town',
    },
];

const Achievements = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    })
    return (
        <>
            <Head>
                <title>
                    Saurabh | Achievements Page
                </title>
                <meta name='description' content='any description' />
            </Head>
            <TransitionEffect />
            <main>
                <Layout>
                    <AnimatedText text={'Achievement Gallery'} className='mb-8 xs:text-2xl sm:text-3xl md:text-4xl' />
                    <div>
                        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
                            <div className="grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {awards.map((award, index) => (
                                    <div key={index} className="bg-white shadow-md rounded p-4">
                                        <Image
                                            src={award.image}
                                            alt={award.title}
                                            width={300}
                                            height={200}
                                            className="w-full h-48 object-fill rounded-t"
                                        />
                                        <h2 className="font-bold text-sm w-full text-center mt-4 text-pink-600">
                                            {award.title}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h2 className='font-bold text-4xl xs:text-2xl w-full text-center my-16'>Extra Curicular Awards</h2>
                    <ul className='pb-20'>
                        <Achievement title={'Rajya Puraskar The Bharat Scout & Guide at Zone-level'}
                            img={Rajya}
                            date={'11 Sept 2014'}
                            link={''} />

                        <Achievement title={'Pre Rajya Puraskar The Bharat Scout & Guide State-Level'}
                            img={preRajya}
                            date={'4th July 2014'}
                            link={''} />

                        <Achievement title={'Tritiya Sopan Camping The Bharat Scout & Guide at raipur region'}
                            img={tritiya}
                            date={'13th SEPT 2013'}
                            link={''} />

                        <Achievement title={'Regional Level Football Competition Under-17 as Left Winger'}
                            img={u17}
                            date={'22 AUG 2013'}
                            link={''} />

                        <Achievement title={'Regional Level Football Competition Under-14 as Center Forward'}
                            img={u14}
                            date={'27th AUG 2012'}
                            link={''} />
                    </ul>
                </Layout>
            </main >
        </>
    )
}

export default Achievements