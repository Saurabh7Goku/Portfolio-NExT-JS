import React, { useState } from 'react';
import AnimatedText from './AnimatedText';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        // Email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(newEmail)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = [];

        // Check if name, email, subject, and message are empty
        if (!name.trim()) {
            errors.push('Name is required.');
        }
        if (!email.trim()) {
            errors.push('Email is required.');
        }
        if (!subject.trim()) {
            errors.push('Subject is required.');
        }
        if (!message.trim()) {
            errors.push('Message is required.');
        }

        // Check if email is valid
        if (!emailError && errors.length === 0) {
            try {
                const response = await fetch('https://formspree.io/f/mqkrzejn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message
                    })
                });

                if (response.ok) {
                    setIsEmailSent(true);
                    setTimeout(() => {
                        setIsEmailSent(false);
                        // Clear all fields
                        setName('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                    }, 3000);
                } else {
                    throw new Error('Failed to send email.');
                }
            } catch (error) {
                console.error(error);
                setFormErrors(['Failed to send email. Please try again later.']);
            }
        } else {
            setFormErrors(errors);
        }
    };


    return (
        <div className="container mx-auto py-8 sm:py-16">
            <AnimatedText text={'Contact Me'} className='lg:!text-5xl sm:!text-3xl xs:!text-xl sm:pb-2' />
            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Name" value={name} onChange={handleNameChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`} id="email" name="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subject" name="subject" type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_dtls">Message</label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="user_dtls" name="user_dtls" rows="4" placeholder="Type here..." value={message} onChange={handleMessageChange} required></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Send Message</button>
                        </div>
                    </form>
                    {formErrors.length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                            {formErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                    {isEmailSent && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <span className="block sm:inline">Email Sent!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
