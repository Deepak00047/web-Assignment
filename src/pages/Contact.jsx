import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    // Team members data with correct image paths
    const teamMembers = [
        {
            name: "Shubhampreet Singh",
            role: "Frontend Developer",
            image: "/images/shubham.jpg" 
        },
        {
            name: "Jaskaran Singh Gill",
            role: "Backend Developer",
            image: "/images/jaskaran.jpg"
        },
        {
            name: "Deepak Sharma",
            role: "Project Manager",
            image: "/images/deepak.jpg" 
        },
        {
            name: "Manmohik Chahal",
            role: "UI/UX Designer",
            image: "/images/manmohik.jpg" 
        }
    ];

    return (
        <div className="relative h-screen">
            {/* Video background */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
            >
                <source src="/videos/2048452-hd_1920_1080_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h1>
                <p className="text-center text-gray-200 mb-12">If you have any questions, feel free to reach out to us!</p>

                {/* Team Section */}
                <h2 className="text-2xl font-semibold text-center text-white mb-8">Meet Our Team</h2>

                <div className="flex justify-center gap-8 flex-wrap">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-6 text-center max-w-xs"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
