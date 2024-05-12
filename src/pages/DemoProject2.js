import AnimatedText from '@/components/AnimatedText'
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import InsightsGrid2 from '@/components/ProjectInsightGrid2';
import { useRouter } from 'next/router';
import TransitionEffect from '@/components/TransitionEffect';

function DemoProject2() {
    const router = useRouter();

    const navigateToPreviousPage = () => {
        router.back();
    };
    return (
        <>
            <Head>
                <title>Saurabh | eCommerce</title>
                <meta name='description' content='any description' />
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
                        <AnimatedText text={'e-Commerce Data Analysis'} className='text-5xl font-bold xs:text-2xl sm:text-2xl md:text-4xl lg:text-6xl' />
                    </div>
                    <div className='pt-10 grid w-full grid-cols-8 gap-16 lg:grid-cols-8 xl:grid-cols-8 xs:flex xs:flex-col sm:flex sm:flex-col'>
                        <div className='col-span-3 flex-col xs:w-full'>
                            <h2 className='mb-4 text-lg font-bold uppercase text-dark/55'>
                                Description
                            </h2>
                            <ul className='list-disc pl-4 xs:pl-0'>
                                <li className='font-medium'>
                                    Welcome to eCommerce Sales Data Analysis...
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">explore</span>  The data used here is an open-source dataset from Kaggle.
                                    This dataset contains two tables:<br /> Details & Orders.
                                    <br />
                                    <span className="text-blue-600">Details Table contains features like:</span>
                                    <br />
                                    - order-ID, Amount, Profit, Quantity, Category, Sub-Category, Payment-mode, Avg. On Order (Self created not default feature).
                                    <br />
                                    <span className="text-blue-600">Order Table contains features like:</span>
                                    <br />
                                    - Order-ID, OrderDate, CustomerName, State, City.
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">Filter Data</span>  We meticulously clean and explore the raw data using Exploratory Data Analysis (EDA) and leverage SQL to transform and filter the information.
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">Engineering</span>  Key features are then extracted through feature engineering, ensuring only the most relevant insights are culled for insightful report generation.
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">Insights</span>  Power BI swoops in as the final weapon, crafting a compelling dashboard that crystallizes the unearthed eCommerce sales intelligence. This meticulous process yields actionable insights, empowering data-driven decision making for the company.
                                </li>
                            </ul>
                        </div>
                        <div className='col-span-5 relative h-max rounded-2xl border-2 border-soild border-dark bg-light p-8 xs:w-full'>
                            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark' />
                            <iframe src="https://app.powerbi.com/view?r=eyJrIjoiZGRmNzRkZjUtOGYzOC00MDI3LThhZjktZGVjMTk2ZDc0MzRhIiwidCI6ImZjNDc5MTA4LTQ3ODAtNGNlZC05M2IzLWMzZjUyNDg3OTUzMiIsImMiOjh9"
                                frameBorder="0" width="100%" height="500" />
                        </div>
                    </div>
                    <AnimatedText text={'Insights From The Data Analysis'} className='py-16 text-5xl font-bold xs:text-2xl sm:text-2xl md:text-4xl lg:text-6xl' />
                    <InsightsGrid2 />
                </Layout>
            </main >
        </>
    )
}

export default DemoProject2