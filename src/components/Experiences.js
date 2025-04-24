import React, { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import LiIcon from './LiIcon';

const Details = ({ position, company, time, address, work1, work2, work3 }) => {
    const ref = useRef(null);
    return (
        <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]'>
            <LiIcon reference={ref} />
            <motion.div
                initial={{ y: 200 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg' >
                    {position}&nbsp; <p className='w-full text-primary capitalize'>@ {company}</p>
                </h3>
                <span className='capitalize font-medium text-dark/60 md:text-sm sm:text-sm xs:text-sm'>
                    {time} | {address}
                </span>
                <div className='font-medium w-full md:text-sm'>
                    <ul>
                        <li>• {work1}</li><br />
                        <li>• {work2}</li><br />
                        <li>• {work3}</li>
                    </ul>
                </div>
            </motion.div>
        </li>
    );
};

function Experience() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    });
    return (
        <div className='my-64 w-full'>
            <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-3xl md:mb-16'>
                Experience
            </h2>

            <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] sm:w-full xs:w-full md:w-full'>
                <motion.div style={{ scaleY: scrollYProgress }} className='absolute left-9 top-1 w-[6px] h-full bg-green-500 origin-top md:w-[2px] md:left-[30px] xs:left-[20px]' />
                <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
                    <Details position={'Data Scientist'} company={'KPMG Bangalore'} time={'JULY 2023 - Current'} address={'Bangalore'}
                        work1='Develops predictive models using machine learning and statistical techniques, builds automated data pipelines for efficient processing, and collaborates with business teams to translate real-world problems into impactful data-driven solutions.'
                        work2='Drives innovation and competitive edge by analyzing user feedback and proprietary data for product development, while fostering a data-driven culture across teams.'
                        work3='Maintains high model accuracy and reliability by continuously monitoring performance and retraining as needed, while ensuring data governance, privacy, and compliance—leading to trustworthy, scalable, and regulation-compliant AI solutions.' />
                    <Details position={'Data Analyst/Developer'} company={'Dectwin Enterprise Ltd;'} time={'APR 2023 - SEPT 2023'} address={'Remote'}
                        work1='Led the design and development of multiple enterprise-level microservice applications of Commerce Experience Group, driving ₹150 Thousands of revenue every quarter of year using the latest technologies of Flutter, dart, TensorFlow Lite, whatsapp APIs.'
                        work2='Designed and implemented scalable APIs and background workers for managing analysis and reports forming for the Sales, Purchase,Expenses while increasing report efficiency by 60%.'
                        work3='Enhanced software speed, surpassing existing solutions, and expanded functionality for improved user experience.' />
                    <Details position={'TensorFlow Developer'} company={'ZTM Academy'} time={'SEPT 2022 - FEB 2023'} address={'Remote'}
                        work1='Create a Skimlit model of RTC papers consisting of 200k labeled Randomized Control Trial (RTC) abstracts with better accuracy.'
                        work2='Designed and developed violence activity detection by using technologies such as Python,Deep learning, Flask Html, CSS.'
                        work3='UsedaCNNneuralnetwork and LSTM to Design, implement, test, deploy and maintain a model for multi-classification of 101 Food Items with greater accuracy than 89%.' />
                </ul>
            </div>
        </div>
    );
}

export default Experience;
