import ContactUs from '@/components/ContactUs'
import React from 'react'
import Head from 'next/head';
import TransitionEffect from '@/components/TransitionEffect';

export const Contacts = () => {
    return (
        <>
            <Head>
                <title>Saurabh | Contact Page</title>
                <meta name='description' content='Feel free to contact me.' />
            </Head>
            <TransitionEffect />
            <div>
                <ContactUs />
            </div>
        </>
    )
}

export default Contacts;