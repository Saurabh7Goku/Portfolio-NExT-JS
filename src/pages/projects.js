import { useState } from 'react';
import Head from 'next/head';
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import TransitionEffect from '@/components/TransitionEffect';

const projectsData = [
    {
        id: 1,
        title: 'eCommerce Analysis - PowerBI',
        category: 'Data Analyst',
        tag: 'data_analyst',
        image: '/images/projects/ecommerce.png',
        description: 'This is a project build using PowerBI and SQL. I used SQL for data filtering and cleaning, where as I used PowerBi for the Dashboard Making for better Data visualization and understanding on the key notes that may or may not affect the Pizza Sales in the Pizza Hut. The Data Set which is used to build this analysis is taken from the open source data hub',
        techStack: 'Tech Stack: Data Analysis, SQL, PowerBI',
        link: '/demo_project2',
        video: ''
    },
    {
        id: 2,
        title: 'Pizza Sales Analysis - PowerBI',
        category: 'Data Analyst',
        tag: 'data_analyst',
        image: '/images/projects/sales.png',
        description: "Used complex parameters to drill down in worksheet and customization using filters and slicers. Created connections, joined new tables, calculations to manipulate data and enabled user driven parameters for visualizations.Used different types of customized visualization (bar charts, pie chart, donut chart, clustered bar chart etc)",
        techStack: 'Tech Stack: MySQL, Data Analysis, PowerBI',
        link: '/demo_project1',
        video: ''
    },
    {
        id: 3,
        title: 'Cancer Classification ',
        category: 'Deep Learning',
        tag: 'machine_learning',
        image: '/images/projects/cc.png',
        description: "This is a Deep Learning project based on the Adenocarcinomas, Which occur most commonly in the: bowel around 90% of bowel cancers are adenocarcinomas, which begin in the glandular tissue lining of the bowel. Most breast cancers are adenocarcinomas. They begin in the milk producing glands in the breast. This is an End-to-End Project which includes CI/CD pipeline and development.This project is done using Modular Coding and using Random Forest as ML Algorithm and Flask as Frontend and Backend Server",
        techStack: 'Tech Stack: AWS EC2, S3, ECR, git Actions, MlFLow, DVC, Dagshub',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/cancer_classification.mp4?alt=media&token=567c6522-feec-4ce9-8848-72eb7f978c0c'
    },
    {
        id: 4,
        title: 'Violence Detection',
        category: 'Machine Learning',
        tag: 'machine_learning',
        image: '/images/projects/violence.jpg',
        description: "A Violence Detection Project which detects certain kinds of activity (like Fighting, Abuse, Arson etc) as Violence. This project is build using Deep Learning algorithms like LSTM(Long Sort-Term Memory) for memory, CNNs(Convolutional Neural Nets) and InceptionNet as Transfer Learning. This project uses Flask and Html as Frontend and Backend Server for the project and shows violence in real time with frame target counter",
        techStack: 'Tech Stack: Deep Learning, Transfer Learning, CNNs, LSTM, Python, Flask, SocketIO, Inception V-NET',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/violence_detection_video.mp4?alt=media&token=40857c30-3972-47dd-8ffd-e05c214e44dc'
    },

    {
        id: 5,
        title: 'Job Posting Search AGENTIC Model',
        category: 'SAAS-AI',
        tag: 'sda',
        image: '/images/projects/jobfind.jpg',
        description: "This is a SAAS Application which searchs job posting when given positons and companies name. The Artificial Intelligence Agent uses Internet to search for all the given position in given companies and return the Job Posting Links. The application is build using React's (Next JS) as Frontend and Python's Flask as Backend Server. It uses Large Language Model like (gpt-4, mixtrl, Gemini etc) and Agents to do the jobs using Custom Tools(like Search Engine - Serper or DuckDuckGO) and Prompt Engineering",
        techStack: 'Tech Stack: LLMs, Agents, Flask, Prompt Engineering, React NextJS, APIS, Hooks, CrewAI',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/Job%20Searching%20Agent%20-%20Made%20with%20Clipchamp.mp4?alt=media&token=4e862d09-47d1-4604-b942-66403e7c8f52'
    },

    {
        id: 6,
        title: 'Get Nutrition-AI',
        category: 'Artificial Intelligence',
        tag: 'ai',
        image: '/images/projects/NUTRITION.jpg',
        description: "This is an Android Application build using flutter SDK in dart named SavantGen which is a personal AI Assistant and also contains feature of ATS Resume Scan. It can Detect Missing Keywords, Improvise the Content writing on the resume, Guide how to improve for targeted JOB's Positions. Contains an Admin Dashboard where Admin can control the User's trials or increases their attempts",
        techStack: 'Tech Stack: Python, LLMs, Agents, CrewAI, API, Gradio',
        link: 'https://huggingface.co/spaces/Saurabhgk18/Nutritionist_AI',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/Nutrition-AI.mp4?alt=media&token=75229000-c38d-454a-807c-9b82df174bc5'
    },

    {
        id: 7,
        title: 'ATS Resume Checker - AI',
        category: 'Artificial Intelligence',
        tag: 'ai',
        image: '/images/projects/ats1.png',
        description: "The ATS Resume Checker is a tool designed to simplify the job application process by providing a comprehensive analysis of your resume against a provided job description. The primary goal is to enhance your chances of success in the applicant tracking system (ATS) by ensuring your resume aligns with the requirements of the targeted job",
        techStack: 'Tech Stack: Python, LLMs, Streamlit, Prompt Engineering',
        link: 'https://huggingface.co/spaces/Saurabhgk18/Resume-Checker-ATS',
        video: ''
    },

    {
        id: 8,
        title: 'ATS-Resume Scanner App',
        category: 'AI-Software',
        tag: 'sda',
        image: '/images/projects/ats1.png',
        description: "ATS Resume Scan: SavantGen's flagship feature revolutionizes job applications by detecting missing keywords and refining resume content and improvise the content of the resume. Personalized Guidance: Users receive tailored suggestions and actionable insights to optimize their resumes for specific job positions. Career Development: SavantGen fosters a collaborative environment, offering invaluable support on the journey to professional success",
        techStack: 'Tech Stack: Flutter, Dart, Firebase, Firebase-Cloud, Rest-API, LLMs',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/savantGEN.mp4?alt=media&token=e0bae2d9-ec42-4ff7-ba98-e4e420bfd5eb'
    },

];

const Projects = () => {
    const [filter, setFilter] = useState('Latest');
    // const [hoveredProject, setHoveredProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };
    const filteredProjects = filter === 'Latest' ? projectsData : projectsData.filter(project => project.tag === filter);

    const handleFilterChange = (category) => {
        setFilter(category);
    };

    return (
        <>
            <Head>
                <title>Saurabh | Projects Page</title>
                <meta name='description' content='any description' />
            </Head>
            <TransitionEffect />

            <main className='w-auto mb-16 flex flex-col items-center justify-center '>
                <Layout className='pt-2'>
                    <AnimatedText text={'Personal Projects'} className='pb-2 sm:text-5xl xs:text-2xl' />
                    <div className="container mx-auto xs:items-center">
                        <div className="mb-4 my-12 flex flex-row items-center justify-center xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-2">
                            <button className="mr-2 mb-2 px-4 py-2 xs:px-1 xs:py-2 xs:text-xs sm:px-1 sm:py-2 sm:text-xs md:px-2 md:py-2 md:text-base lg:px-2 lg:py-2 lg:text-base bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md shadow-blue-900" onClick={() => handleFilterChange('Latest')}>Latest</button>
                            <button className="mr-2 mb-2 px-4 py-2 xs:px-1 xs:py-2 xs:text-xs sm:px-1 sm:py-2 sm:text-xs md:px-2 md:py-2 md:text-base lg:px-2 lg:py-2 lg:text-base bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md shadow-blue-900" onClick={() => handleFilterChange('data_analyst')}>Data Analyst</button>
                            <button className="mr-2 mb-2 px-4 py-2 xs:px-1 xs:py-2 xs:text-xs sm:px-1 sm:py-2 sm:text-xs md:px-2 md:py-2 md:text-base lg:px-2 lg:py-2 lg:text-base bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md shadow-blue-900" onClick={() => handleFilterChange('machine_learning')}>Machine Learning</button>
                            <button className="mr-2 mb-2 px-4 py-2 xs:px-1 xs:py-2 xs:text-xs sm:px-1 sm:py-2 sm:text-xs md:px-2 md:py-2 md:text-base lg:px-2 lg:py-2 lg:text-base bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md shadow-blue-900" onClick={() => handleFilterChange('sda')}>SAAS Projects</button>
                            <button className="mr-2 mb-2 px-4 py-2 xs:px-1 xs:py-2 xs:text-xs sm:px-1 sm:py-2 sm:text-xs md:px-2 md:py-2 md:text-base lg:px-2 lg:py-2 lg:text-base bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md shadow-blue-900" onClick={() => handleFilterChange('ai')}>Artifical Intelligence</button>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 120 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-3 gap-8 pt-10 w-full xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                        >
                            {filteredProjects.slice(0, 8).map(project => (
                                <div key={project.id} className="project-container bg-gray-100 p-4 m-2 rounded-[1rem] shadow-lg relative">
                                    <div className=' project-container absolute top-0 -right-3 -z-10 w-[102%] h-[103%]  rounded-[2rem] bg-dark' />
                                    <img className='h-[70%] rounded-[1rem]  sm:h-[55%] md:h-[55%] lg:h-[60%]' src={project.image} alt={project.title} />
                                    <h4 className="text-lg md:text-lg sm:text-lg xs:text-sm font-semibold mb-2 flex flex-col items-center">{project.title}</h4>
                                    <p className="text-sm mb-2">Category: {project.category}</p>
                                    <div className="flex justify-evenly mb-2">
                                        {project.link && project.link.trim() !== '' && (
                                            <a href={project.link} target='_blank' className="btn btn-sm bg-blue-500 hover:bg-blue-300 text-white px-2 py-1 rounded-lg">View Live</a>
                                        )}
                                        <button className="btn btn-sm bg-blue-500 hover:bg-blue-300 text-white px-2 py-1 rounded-lg" onClick={() => handleProjectClick(project)}>About Project</button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </Layout>
            </main>
            {/* Modal for displaying project details */}
            {selectedProject && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="max-w-3xl w-full bg-white p-8 rounded-lg relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold mb-4">{selectedProject.title}</h2>
                        {selectedProject && selectedProject.video ? (
                            <div className="video-container relative items-center" style={{ paddingBottom: selectedProject && selectedProject.aspectRatio ? `${(1 / selectedProject.aspectRatio) * 100}%` : '56.25%' }}>
                                <video controls src={selectedProject.video} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                            </div>
                        ) : (
                            <h2 className='flex flex-col items-center font-bold text-sm py-4' >No Demo Videos available. Visit the Deployed link,<p className='text-red-600'>Click Go live</p></h2>
                        )}

                        <ul className="list-disc pl-4 mb-4 mt-2">
                            {selectedProject.description.split('.').map((sentence, index) => (
                                <li key={index}>{sentence}</li>
                            ))}
                        </ul>

                        <p className="text-xs text-blue-700 flex flex-col items-center justify-center font-bold">{selectedProject.techStack}</p>
                        {selectedProject.link && (
                            <a href={selectedProject.link} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Go Live</a>
                        )}
                    </div>
                </div >
            )}
        </>
    )
}

export default Projects;