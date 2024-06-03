import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Spinner from '../../public/images/spinner.gif';

const Loader = ({ loading, text }) => {
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [loading]);

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 ${loading ? 'z-50' : '-z-50'}`}>
            {loading && (
                <div className="flex flex-col justify-center items-center">
                    <Head>
                        <title>Loading...</title>
                    </Head>
                    <p className="text-3xl font-bold mb-4">{text}</p>
                    <Image src={Spinner} alt="loader" priority width={80} height={80} />
                </div>
            )}
        </div>
    );
};

export default Loader;
