import AnimatedText from '@/components/AnimatedText'
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import InsightsGrid from '@/components/ProjectInsightGrid';
import { useRouter } from 'next/router';
import TransitionEffect from '@/components/TransitionEffect';

function DemoProject1() {
    const router = useRouter();

    const navigateToPreviousPage = () => {
        router.back();
    };
    return (
        <>
            <Head>
                <title>Saurabh | pizzaSales</title>
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
                        <AnimatedText text={'Sales Data Analysis'} className='text-5xl font-bold xs:text-2xl sm:text-2xl md:text-4xl lg:text-6xl' />
                    </div>
                    <div className='pt-10 grid w-full grid-cols-8 gap-16 lg:grid-cols-8 xl:grid-cols-8 xs:flex xs:flex-col sm:flex sm:flex-col'>
                        <div className='col-span-3 flex-col items-start justify-start xs:w-full sm:w-full'>
                            <h2 className='mb-4 text-lg font-bold uppercase text-dark/55'>
                                Description
                            </h2>
                            <ul className='list-disc pl-4 xs:pl-0'>
                                <li className='font-medium'>
                                    <span class="material-icons text-blue-600">Dashboard</span> Welcome to eCommerce Sales Data Analysis...
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">Multiline_chart</span> This is an End-to-End Data Analysis on the Pizza Sales Dataset using Power BI and SSMS (SQL Server Management Studio).
                                </li>
                                <li className='my-2 font-medium'>
                                    <span class="material-icons text-blue-600">View_list</span> This Dashboard offers:
                                    <ul className='pl-4 list-disc list-inside'>
                                        <li className='font-medium'>
                                            <span class="material-icons text-blue-600">swap_horiz</span> Navigator button to switch between pages (Home &amp; <span className="text-blue-600">Best/Worst Sellers</span>).
                                        </li>
                                        <li className='font-medium'>
                                            <span class="material-icons text-blue-600">calendar_today</span> Range dialer for specific date analysis.
                                        </li>
                                        <li className='font-medium'>
                                            <span class="material-icons text-blue-600">filter_list</span> Category filter dropdown to analyze specific <span className="text-blue-600">Pizza categories</span>.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className='col-span-5 relative h-max rounded-2xl border-2 border-soild border-dark bg-light p-8'>
                            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark' />
                            <iframe src="https://app.powerbi.com/view?r=eyJrIjoiODI4ZjZiODAtMjFmOC00OWFmLWJjYmQtNDc0Y2U4ZjYwOWZkIiwidCI6ImZjNDc5MTA4LTQ3ODAtNGNlZC05M2IzLWMzZjUyNDg3OTUzMiIsImMiOjh9"
                                frameBorder="0" width="100%" height="500" />
                        </div>
                    </div>
                    <AnimatedText text={'Insights From The Data Analysis'} className='py-16 text-5xl font-bold xs:text-2xl sm:text-2xl md:text-4xl lg:text-6xl' />
                    <InsightsGrid />
                </Layout>

            </main >
        </>
    )
}

export default DemoProject1