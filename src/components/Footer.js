import React from 'react'
import Layout from './Layout'
import Link from 'next/link'

function Footer() {
    return (
        <footer className='w-full border-t-2 border-soild border-dark
        font-medium text-lg sm:text-base py-8 xl:py-0 bg-gray-100'>
            <Layout className='py-8 flex items-center justify-between md:flex-col lg:flex-col md:py-8 lg:py-12 xl:p-8 '>
                <span>
                    {new Date().getFullYear()} &copy; All Rights Reserved
                </span>
                <div className='flex item-center'>
                    Build With <span className='text-primary text-2xl px-1'>&#9825; </span>
                    by&nbsp;<Link href="/" className='underline underline-offset-2'>Saurabhgk7</Link>
                </div>
                <Link href="" target={'_blank'} className='underline underline-offset-2'>Say hello</Link>
            </Layout>
        </footer>
    )
}

export default Footer