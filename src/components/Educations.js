import React, { useRef } from 'react'
import { useScroll, motion } from 'framer-motion';
import LiIcon from './LiIcon';

const Details = ({ type, course, time, address }) => {
    const ref = useRef(null);
    return <li ref={ref} className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]'>
        <LiIcon reference={ref} />
        <motion.div
            initial={{ y: 200 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}

        >
            <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-sm' >
                {type}&nbsp;
            </h3>
            <span className='capitalize font-medium text-dark/60 md:text-sm sm:text-sm xs:text-xs'>
                {address}
            </span><br />
            <span className='capitalize font-medium text-primary md:text-sm sm:text-sm xs:text-xs'>
                {time}
            </span>
            <p className='font-medium w-full md:text-sm sm:text-sm xs:text-xs'>
                {course}
            </p>
        </motion.div>
    </li>
}

function Education() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    })
    return (
        <div className='my-64 xs:my-24 xs:pb-24'>
            <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-3xl md:mb-16'>
                Education
            </h2>

            <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] sm:w-full xs:w-full md:w-full'>
                <motion.div style={{ scaleY: scrollYProgress }}
                    className='absolute left-9 top-1 w-[6px] h-full bg-green-500 origin-top md:w-[2px] md:left-[30px] xs:left-[20px]' />
                <div className='w-full flex flex-col items-start justify-between ml-4'>
                    <Details type={'Bachelors Of Technology In Computer Science'}
                        course={'Relevat Course included Machine Learning, Deep Learning, Data Analytics, SQL, Python, Data Structure & Algorithms'}
                        time={'AUG 2019 - JUNE 2023'}
                        address={'Rajiv Gandhi Proudyogiki Vishwavidyalaya Bhopal(M.P)'}
                    />
                    <Details type={'Higher Seconday School (12th Board) In Mathematics'}
                        course={'Relevat Course included Maths, Physics, Chemistry'}
                        time={'APR 2016 - MAR 2017'}
                        address={'St. Joesph Higher Seconday, Jhagrakhand(C.G)'}
                    />
                    <Details type={'Senior Seconday School (10th Board) In Mathematics'}
                        course={'Relevat Course included Maths, Physics, Chemistry, Social Science'}
                        time={'APR 2014 - MAR 2015'}
                        address={'Kendriya Vidyalaya, Jhagrakhand(C.G)'}
                    />
                </div>
            </div>
            <div className='pb-20'></div>
        </div>

    )
}

export default Education