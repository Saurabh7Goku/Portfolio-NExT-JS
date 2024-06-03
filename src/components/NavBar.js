import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GithubIcon, LinkedInIcon, TwitterIcon } from './Icons'
import { motion } from "framer-motion";

const CustomLink = ({ href, title, className = "" }) => {

    const router = useRouter();


    return (
        <Link href={href} className={`${className} relative group`}>
            {title}
            <span className={`h-[2px] inline-block bg-dark 
                absolute left-0 -bottom-0.5
                group-hover:w-full transition-[width] ease duration-300
                ${router.asPath === href ? 'w-full' : "w-0"}
                `}>
                &nbsp;
            </span>
        </Link>
    )
}
const CustomMobileLink = ({ href, title, className = "", toggle }) => {

    const router = useRouter();

    const handleClick = () => {
        toggle();
        router.push(href)
    }

    return (
        <button href={href} className={`${className} relative group text-light my-2`} onClick={handleClick}>
            {title}
            < span className={`h-[1px] inline-block bg-dark 
                absolute left-0 -bottom-0.5
                group-hover:w-full transition-[width] ease duration-300
                ${router.asPath === href ? 'w-full' : "w-0"}
                bg-light
                `}>
                &nbsp;
            </span >
        </button >
    )
}

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header
            className='w-full px-32 py-8 font-medium flex items-center justify-between relative bg-gray-100 z-10 lg:px-16 md:px-12 sm:px-8'>
            <button className={`flex-col justify-center items-center hidden lg:flex`} onClick={handleClick}>
                <span className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-0.5 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>
            <div className='w-full flex justify-between items-center lg:hidden'>
                <nav>
                    <CustomLink href="/" title={"Home"} className='mr-4' />
                    <CustomLink href="/about" title={"About"} className='mx-4' />
                    <CustomLink href="/projects" title={"Projects"} className='mx-4' />
                    <CustomLink href="/achievements" title={"Achievements"} className='mx-4' />
                    <CustomLink href="/ObjectDetection" title={"ObjectDetection"} className='mx-4' />
                    <CustomLink href="/contacts" title={"Contacts"} className='mx-4' />
                </nav>

                <nav className='flex items-center justify-center flex-wrap'>
                    <motion.a href="https://twitter.com/saurabhgk7" target={"_blank"}
                        whileHover={{ y: -8 }}
                        whileTap={{ scale: 0.6 }}
                        className='w-6 mr-3'>
                        <TwitterIcon />
                    </motion.a>

                    <motion.a href="https://github.com/Saurabh7Goku" target={"_blank"}
                        whileHover={{ y: -8 }}
                        whileTap={{ scale: 0.6 }}
                        className='w-6 mx-3'>
                        <GithubIcon />
                    </motion.a>

                    <motion.a href="https://www.linkedin.com/in/saurabh-singh-682a811b0/" target={"_blank"}
                        whileHover={{ y: -8 }}
                        whileTap={{ scale: 0.6 }}
                        className='w-6 mx-3'>
                        <LinkedInIcon />
                    </motion.a>
                </nav>
            </div>

            {
                isOpen ?
                    <div className='min-w-[70vw] flex flex-col z-30 justify-between items-center fixed top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2 bg-dark/70 rounded-lg backdrop-blur-md py-32'>
                        <nav className='flex items-center flex-col justify-center'>
                            <CustomMobileLink href="/" title={"Home"} className='' toggle={handleClick} />
                            <CustomMobileLink href="/about" title={"About"} className='' toggle={handleClick} />
                            <CustomMobileLink href="/projects" title={"Projects"} className='' toggle={handleClick} />
                            <CustomMobileLink href="/achievements" title={"Achievements"} className='' toggle={handleClick} />
                        </nav>

                        <nav className='flex items-center justify-center flex-wrap mt-2'>
                            <motion.a href="https://twitter.com/saurabhgk7" target={"_blank"}
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.6 }}
                                className='w-6 mr-3 sm:mx-1'>
                                <TwitterIcon />
                            </motion.a>

                            <motion.a href="https://github.com/Saurabh7Goku" target={"_blank"}
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.6 }}
                                className='w-6 mx-3 sm:mx-1'>
                                <GithubIcon />
                            </motion.a>

                            <motion.a href="https://www.linkedin.com/in/saurabh-singh-682a811b0/" target={"_blank"}
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.6 }}
                                className='w-6 mx-3 sm:mx-1'>
                                <LinkedInIcon />
                            </motion.a>
                        </nav>
                    </div> : null
            }
        </header >
    )
}

export default NavBar