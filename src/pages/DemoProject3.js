import AnimatedText from '@/components/AnimatedText'
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import TransitionEffect from '@/components/TransitionEffect';
import InsightsGrid3 from '@/components/ProjectInsightGrid3';

function DemoProject3() {
    const router = useRouter();

    const navigateToPreviousPage = () => {
        router.back();
    };
    return (
        <>
            <Head>
                <title>Saurabh | Zomato Analysis</title>
                <meta name='description' content='A detailed analysis of Zomato Business' />
            </Head>
            <TransitionEffect />
            <main>
                <Layout className='pt-10'>
                    <div className="flex items-center">
                        <button className="mr-2">
                            <svg onClick={navigateToPreviousPage} className="w-8 h-8 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <AnimatedText text={'Zomato Business Analysis'} className='text-5xl font-bold xs:text-2xl sm:text-2xl md:text-4xl lg:text-6xl' />
                    </div>
                    <div className='pt-10 grid w-full grid-cols-8 gap-16 lg:grid-cols-8 xl:grid-cols-8 xs:flex xs:flex-col sm:flex sm:flex-col'>
                        <div className='col-span-3 flex-col items-start justify-start xs:w-full sm:w-full'>
                            <h2 className='mb-4 text-lg font-bold uppercase text-dark/55'>
                                Description
                            </h2>
                            <ul className='list-disc pl-4 xs:pl-0'>
                                <li className='font-medium'>
                                    Welcome to Zomato Food Sales Data Analysis...
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">explore</span> The data used here is sourced from Zomato's comprehensive dataset covering various aspects of food sales across India. This dataset comprises seven tables: Food, Measure, Menu, Orders, RankTable, Restaurant, and Users.
                                    <br />
                                    <span className="text-blue-600">Food Table contains features like:</span>
                                    <br />
                                    - Food ID, Food Name, Cuisine, Price, Ingredients, etc.
                                    <br />
                                    <span className="text-blue-600">Orders Table contains features like:</span>
                                    <br />
                                    - Order ID, Order Date, Customer Name, City, State, etc.
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">Filter Data</span> We meticulously clean and explore the raw data using Exploratory Data Analysis (EDA) and leverage SQL to transform and filter the information.
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">Engineering</span> Key features are then extracted through feature engineering, ensuring only the most relevant insights are culled for insightful report generation.
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">Insights</span> Power BI swoops in as the final weapon, crafting a compelling dashboard that crystallizes the unearthed Zomato food sales intelligence. This meticulous process yields actionable insights, empowering data-driven decision-making for the company.
                                </li>
                            </ul>
                        </div>

                        <div className='col-span-5 relative h-max rounded-2xl border-2 border-soild border-dark bg-light p-8'>
                            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark' />
                            <iframe title="Zomato Dashboard" width="100%" height="500" src="https://app.powerbi.com/view?r=eyJrIjoiNzA5ZDFjNDMtNDRiMy00NzU1LWE3YjEtOWY2Njc4NjUxNTAwIiwidCI6ImZjNDc5MTA4LTQ3ODAtNGNlZC05M2IzLWMzZjUyNDg3OTUzMiIsImMiOjh9&pageName=ReportSection"
                                frameborder="0" allowFullScreen="true">
                            </iframe>
                        </div>
                    </div>
                    <AnimatedText text={'Insights From The Data Analysis'} className='py-16 text-5xl font-bold xs:text-2xl sm:text-2xl md:text-4xl lg:text-6xl' />
                    <InsightsGrid3 />
                </Layout>

            </main >
        </>
    )
}

export default DemoProject3