import AnimatedText from '@/components/AnimatedText'
import React, { useEffect, useRef } from 'react'
import Head from 'next/head';
import Layout from '@/components/Layout';
import Image from 'next/image';
import profilePic from "../../public/images/profile/img.jpg"
import { useMotionValue, useSpring, useInView } from 'framer-motion';
import Skills from '@/components/Skills';
import Experience from '@/components/Experiences';
import Education from '@/components/Educations';
import TransitionEffect from '@/components/TransitionEffect';

const AnimatedNumber = ({ value }) => {
    const ref = useRef(null);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 })
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue, value])

    return <span ref={ref}></span>
}

function about() {
    return (
        <>
            <Head>
                <title>
                    Saurabh | About Page
                </title>
                <meta name='description' content='any description' />
            </Head>
            <TransitionEffect />
            <main className='flex w-full flex-col items-center justify-center'>
                <Layout className='pt-6'>
                    <AnimatedText text="Welcome to the About section" className='mb-16 lg:!text-5xl sm:!text-3xl xs:!text-xl sm:pb-2' />
                    <div className='grid w-full grid-cols-8 gap-16 sm:gap-8'>
                        <div className='col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8'>
                            <h2 className='mb-4 text-lg font-bold uppercase text-dark/55'>
                                Introductions
                            </h2>
                            <p className='font-medium sm:text-sm md:text-lg xl:text-lg'>
                                Hi There, I&apos;m a Jr. Data Scientist at KPMG Bangalore. Leveraging data analytics and machine learning to drive impactful business solutions.
                                Passionate about transforming complex datasets into actionable insights.
                            </p>

                            <p className='my-4 font-medium sm:text-sm md:text-lg xl:text-lg'>I also designed and implemented scalable APIs and
                                background workers for managing SAAS Applications,
                                I enhanced software speed, surpassing existing solutions, and expanded
                                functionality for improved user experience.
                            </p>

                            <p className='font-medium sm:text-sm md:text-lg xl:text-lg'>Recently, I've been on the project which automate code, edit and re-write the code for the given
                                prompt query, the AI asked several queries also regarding the pathway of the client and what output is expected the AI utilizes the custome build editor to run code in docker env.
                                The AI is capable of solving problems, Maths, Coding, General Apptitude and trivial Queries.
                            </p>
                        </div>
                        <div className='col-span-3 relative h-max rounded-2xl border-2 border-soild border-dark bg-light p-8 xl:col-span-4 md:order-1 md:col-span-8 '>
                            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark ' />
                            <Image src={profilePic} alt="saurabh" className="w-full h-auto rounded-2xl" priority
                                sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                            />
                        </div>
                        <div className='col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3'>
                            <div className='flex flex-col items-end justify-center xl:items-center'>
                                <span className='inline-block text-7xl font-bold md:text-5xl sm:text-3xl xs:text-3xl'>
                                    <AnimatedNumber value={7} />
                                </span>
                                <h2 className='text-xl font-medium capitalize text-dark/65 xl:text-center md:text-lg sm:text-base xs:text-sm'>Freelanced Clients</h2>
                            </div>
                            <div className='flex flex-col items-end justify-center xl:items-center'>
                                <span className='inline-block text-7xl font-bold md:text-5xl sm:text-3xl xs:text-3xl'>
                                    <AnimatedNumber value={49} />+
                                </span>
                                <h2 className='text-xl font-medium capitalize text-dark/65 xl:text-center md:text-lg sm:text-base xs:text-sm'>projects Completed</h2>
                            </div>
                            <div className='flex flex-col items-end justify-center xl:items-center'>
                                <span className='inline-block text-7xl font-bold md:text-5xl sm:text-3xl xs:text-3xl'>
                                    18+
                                </span>
                                <h2 className='text-xl font-medium capitalize text-dark/65 xl:text-center md:text-lg sm:text-base xs:text-sm'>Months Of Experience </h2>
                            </div>
                        </div>
                    </div>
                    <Skills />
                    <Experience />
                    <Education />
                </Layout>
            </main>
        </>
    )
}

export default about