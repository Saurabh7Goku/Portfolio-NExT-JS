import { useState } from 'react';
import Head from 'next/head';
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import TransitionEffect from '@/components/TransitionEffect';
import Image from 'next/image';


const projectsData = [
    {
        id: 1,
        title: 'Zomato Business Analysis - PowerBI',
        category: 'Data Analyst',
        tag: 'data_analyst',
        image: '/images/projects/zomato.png',
        description: "The data used here is sourced from Zomato's comprehensive dataset covering various aspects of food sales across India.This meticulous process yields actionable insights, empowering data-driven decision-making for the company.Used different types of customized visualization (bar charts, pie chart, donut chart, clustered bar chart etc)",
        techStack: 'Tech Stack: SQL, Data Analysis, PowerBI',
        link: '/DemoProject3',
        video: '',
        code: 'https://github.com/Saurabh7Goku'
    },

    {
        id: 2,
        title: 'Object Detection',
        category: 'Machine Learning',
        tag: 'machine_learning',
        image: '/images/projects/obj.png',
        description: "This is a machine learning project for object detections using transfer learning Using CoCo Dataset for training. This application takes an image and generate a prediction confidence for each category present inside the image and draw a rectangle around them. Using Tranfer learning the Application works 60% faster and 40% more efficient than the standard Approach",
        techStack: 'Tech Stack: Deep Learning, Transfer Learning, NextJS, APIs',
        link: '/ObjectDetection',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/objectDetection.mp4?alt=media&token=77e06830-85df-49b8-9a6b-b8183ac2f7e4',
        code: 'https://github.com/Saurabh7Goku'
    },

    {
        id: 3,
        title: 'Pizza Sales Analysis - PowerBI',
        category: 'Data Analyst',
        tag: 'data_analyst',
        image: '/images/projects/sales.png',
        description: "Used complex parameters to drill down in worksheet and customization using filters and slicers. Created connections, joined new tables, calculations to manipulate data and enabled user driven parameters for visualizations.Used different types of customized visualization (bar charts, pie chart, donut chart, clustered bar chart etc)",
        techStack: 'Tech Stack: SQL, Data Analysis, PowerBI',
        link: '/DemoProject1',
        video: '',
        code: 'https://github.com/Saurabh7Goku/Sales_data_analysis'
    },
    {
        id: 4,
        title: 'eCommerce Analysis - PowerBI',
        category: 'Data Analyst',
        tag: 'data_analyst',
        image: '/images/projects/ecommerce.png',
        description: 'This is a project build using PowerBI and SQL. I used SQL for data filtering and cleaning, where as I used PowerBi for the Dashboard Making for better Data visualization and understanding on the key notes that may or may not affect the Pizza Sales in the Pizza Hut. The Data Set which is used to build this analysis is taken from the open source data hub',
        techStack: 'Tech Stack: Data Analysis, SQL, PowerBI',
        link: '/DemoProject2',
        video: '',
        code: 'https://github.com/Saurabh7Goku/eCommerceAnalysis'
    },

    {
        id: 5,
        title: 'Cancer Classification',
        category: 'Deep Learning',
        tag: 'machine_learning',
        image: '/images/projects/cc.png',
        description: "This is a Deep Learning project based on the Adenocarcinomas, Which occur most commonly in the: bowel around 90% of bowel cancers are adenocarcinomas, which begin in the glandular tissue lining of the bowel. Most breast cancers are adenocarcinomas. They begin in the milk producing glands in the breast. This is an End-to-End Project which includes CI/CD pipeline and development.This project is done using Modular Coding and using Random Forest as ML Algorithm and Flask as Frontend and Backend Server",
        techStack: 'Tech Stack: AWS EC2, S3, ECR, git Actions, MlFLow, DVC, Dagshub',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/cancer_classification.mp4?alt=media&token=567c6522-feec-4ce9-8848-72eb7f978c0c',
        code: 'https://github.com/Saurabh7Goku/END_TO_END-Chest-Cancer-Detection-using-MlFLow-DVC'
    },
    {
        id: 6,
        title: 'Job Posting Search AGENTIC Model',
        category: 'SAAS-AI',
        tag: 'sda',
        image: '/images/projects/job.png',
        description: "This is a SAAS Application which searchs job posting when given positons and companies name. The Artificial Intelligence Agent uses Internet to search for all the given position in given companies and return the Job Posting Links. The application is build using React's (Next JS) as Frontend and Python's Flask as Backend Server. It uses Large Language Model like (gpt-4, mixtrl, Gemini etc) and Agents to do the jobs using Custom Tools(like Search Engine - Serper or DuckDuckGO) and Prompt Engineering",
        techStack: 'Tech Stack: LLMs, Agents, Flask, Prompt Engineering, React NextJS, APIS, Hooks, CrewAI',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/Job%20Searching%20Agent%20-%20Made%20with%20Clipchamp.mp4?alt=media&token=4e862d09-47d1-4604-b942-66403e7c8f52',
        code: 'https://github.com/Saurabh7Goku/Job-Posting-Search-Agent'
    },
    {
        id: 7,
        title: 'Violence Detection',
        category: 'Machine Learning',
        tag: 'machine_learning',
        image: '/images/projects/violence.jpg',
        description: "A Violence Detection Project which detects certain kinds of activity (like Fighting, Abuse, Arson etc) as Violence. This project is build using Deep Learning algorithms like LSTM(Long Sort-Term Memory) for memory, CNNs(Convolutional Neural Nets) and InceptionNet as Transfer Learning. This project uses Flask and Html as Frontend and Backend Server for the project and shows violence in real time with frame target counter",
        techStack: 'Tech Stack: Deep Learning, Transfer Learning, CNNs, LSTM, Python, Flask, SocketIO, Inception V-NET',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/violence_detection_video.mp4?alt=media&token=40857c30-3972-47dd-8ffd-e05c214e44dc',
        code: 'https://github.com/Saurabh7Goku/realtime_violencedetection'
    },

    {
        id: 8,
        title: 'Get Nutrition-AI',
        category: 'Artificial Intelligence',
        tag: 'ai',
        image: '/images/projects/NUTRITION.jpg',
        description: "This is an Android Application build using flutter SDK in dart named SavantGen which is a personal AI Assistant and also contains feature of ATS Resume Scan. It can Detect Missing Keywords, Improvise the Content writing on the resume, Guide how to improve for targeted JOB's Positions. Contains an Admin Dashboard where Admin can control the User's trials or increases their attempts",
        techStack: 'Tech Stack: Python, LLMs, Agents, CrewAI, API, Gradio',
        link: 'https://huggingface.co/spaces/Saurabhgk18/Nutritionist_AI',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/Nutrition-AI.mp4?alt=media&token=75229000-c38d-454a-807c-9b82df174bc5',
        code: 'https://github.com/Saurabh7Goku/Nutritionist_AI'
    },
    {
        id: 9,
        title: 'ATS Resume Checker - AI',
        category: 'Artificial Intelligence',
        tag: 'ai',
        image: '/images/projects/ats1.png',
        description: "The ATS Resume Checker is a tool designed to simplify the job application process by providing a comprehensive analysis of your resume against a provided job description. The primary goal is to enhance your chances of success in the applicant tracking system (ATS) by ensuring your resume aligns with the requirements of the targeted job",
        techStack: 'Tech Stack: Python, LLMs, Streamlit, Prompt Engineering',
        link: 'https://huggingface.co/spaces/Saurabhgk18/Resume-Checker-ATS',
        video: '',
        code: 'https://github.com/Saurabh7Goku/ATS_Resume_Checker'
    },
    {
        id: 10,
        title: 'ATS-Resume Scanner App',
        category: 'AI-Software',
        tag: 'sda',
        image: '/images/projects/ats1.png',
        description: "ATS Resume Scan: SavantGen's flagship feature revolutionizes job applications by detecting missing keywords and refining resume content and improvise the content of the resume. Personalized Guidance: Users receive tailored suggestions and actionable insights to optimize their resumes for specific job positions. Career Development: SavantGen fosters a collaborative environment, offering invaluable support on the journey to professional success",
        techStack: 'Tech Stack: Flutter, Dart, Firebase, Firebase-Cloud, Rest-API, LLMs',
        link: '',
        video: 'https://firebasestorage.googleapis.com/v0/b/newtry-d602d.appspot.com/o/savantGEN.mp4?alt=media&token=e0bae2d9-ec42-4ff7-ba98-e4e420bfd5eb',
        code: 'https://github.com/Saurabh7Goku/SavantGen-AI'
    },
    {
        id: 11,
        title: 'Chat Application AI',
        category: 'Artificial Intelligence',
        tag: 'ai',
        image: '/images/projects/chatbot.jpg',
        description: "This is a Artificial Intelligence Application which will answer to your queries real quick and effortlessly using Large Language Models. We leverage state-of-the-art language models hosted on the Hugging Face Model Hub to power our chat bot. The backend of our Chat Bot is built using Python, a versatile and powerful programming language The user interface of our application is developed using Streamlit",
        techStack: 'Tech Stack: Python, Streamlit, LLM, API, HuggingFace and Huggingface Spaces',
        link: 'https://huggingface.co/spaces/Saurabhgk18/custome_chatbot',
        video: '',
        code: 'https://github.com/Saurabh7Goku/Multi_Model-Chat-App',

    },
    {
        id: 12,
        title: 'Billboards Data Analysis',
        category: 'Data Analysis',
        tag: 'data_analyst',
        image: '/images/projects/billboards.png',
        description: "This is a data anlysis of Billboard top-100 charts songs having various music styles from Classic, Rock to Jazz Users can interactively choose a year/genre range they are interested in to get a closer look at subtleties. For each song, I count the number of duplicate lines that appear in the lyrics, This can be used as a rough measure of repetition in the song content, that is the more duplicate lines in the lyrics, the more repetitive a song is. Using the Natural Language Toolkit (NLTK) for Python, I used the VADER model for parsimonious rule-based sentiment analysis of each song's lyrics, Each song was run through a sentiment analyzer and output an object with data about its sentiment",
        techStack: 'Tech Stack: Python, JavaScript, Data analysis, NLTK, NLP, rule-based sentiment analysis',
        link: 'https://saurabh7goku.github.io/Billboard-Analysis/',
        video: '',
        code: 'https://github.com/Saurabh7Goku/Billboard-Analysis',
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
                            className="grid grid-cols-3 gap-8 pt-10 w-full xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 "
                        >
                            {filteredProjects.slice(0, 9).map(project => (
                                <div key={project.id} className="project-container bg-gray-100 p-4 m-2 rounded-[2rem] relative">
                                    <div className=' project-container absolute top-0 -right-3 -z-10 w-[102%] h-[103%]  rounded-[2rem] bg-dark' />
                                    <Image className='h-[70%] rounded-[1rem]  sm:h-[55%] md:h-[55%] lg:h-[60%]' src={project.image} alt={project.title} width={400} height={300} />
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
            {selectedProject &&
                (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="max-w-3xl w-full max-h-screen bg-white p-8 rounded-lg relative overflow-y-auto">
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

                            <p className="text-xs text-blue-700 flex flex-col items-center justify-center font-bold py-2">{selectedProject.techStack}</p>
                            <div className='flex flex-row justify-between'>
                                {selectedProject.link && (
                                    <a href={selectedProject.link} target='_blank' className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Go Live</a>
                                )}
                                <a href={selectedProject.code} target='_blank' className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Code Base</a>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default Projects;
