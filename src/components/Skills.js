import React from 'react'
import { motion } from 'framer-motion';


const Skill = ({ name, x, y }) => {
    return (
        <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light
                p-4 shadow-dark cursor-pointer absolute lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 sm:bg-transparent sm:text-dark xs:bg-transparent xs:text-dark'
            whileHover={{ scale: 1.05 }}
            initial={{ x: 0, y: 0 }}
            whileInView={{ x: x, y: y }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
        >
            {name}
        </motion.div >
    )
}

function Skills() {
    return (
        <>
            <h2 className='font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32'>Skills</h2>
            <div className='w-full h-screen relative flex items-center justify-center 
            rounded-full bg-circularLight lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] lg:bg-circularLightLg md:bg-circularLightMd sm:bg-circularLightSm'>
                <motion.div className='flex items-center justify-center rounded-full font-semibold bg-dark text-light
                py-3 px-6 shadow-dark cursor-pointer absolute lg:p-5 md:p-3 xs:text-xs xs:p-1 sm:text-xs'
                    whileHover={{ scale: 1.2 }}>
                    Data Science
                </motion.div>
                <Skill name="Machine Learning" x="10vw" y="-12vw" />
                <Skill name="MlFlow" x="30vw" y="-2vw" />
                <Skill name="PowerBI" x="22vw" y="-7vw" />
                <Skill name="Tableau" x="18vw" y="2vw" />
                <Skill name="Excel" x="25vw" y="10vw" />
                <Skill name="SQL" x="-2vw" y="7vw" />
                <Skill name="MlOps" x="-14vw" y="7vw" />
                <Skill name="Python" x="8vw" y="-22vw" />
                <Skill name="CI/CD" x="13vw" y="8vw" />
                <Skill name="Dashboarding" x="-21vw" y="-14vw" />
                <Skill name="Pandas" x="-28vw" y="12vw" />
                <Skill name="NLP" x="20vw" y="-17vw" />
                <Skill name="Statistics" x="-8vw" y="-18vw" />
                <Skill name="Model Deployment" x="-7vw" y="17vw" />
                <Skill name="AWS cloud" x="-16vw" y="-22vw" />
                <Skill name="LLM Models" x="-30vw" y="-1vw" />
                <Skill name="AGI" x="-10vw" y="-7vw" />
            </div>
        </>
    )
}

export default Skills