import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
    
    const videos = [
        
        "/videos/istockphoto-1471847063-640_adpp_is.mp4",
        "/videos/5446310-hd_1920_1080_30fps.mp4",
        "/videos/855081-hd_1920_1080_25fps.mp4",
        "/videos/1508067-uhd_3840_2160_25fps.mp4",
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);  // To track current video
    const videoRef = useRef(null);  // Ref to manage the video element
    const navigate = useNavigate();  // Navigate hook for routing

    // Check if user is authenticated based on localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    // Video ends, switch to next video
    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);  // Loop through videos
    };

    // Handle Animals button click
    const handleAnimalsClick = () => {
        if (isAuthenticated) {
            navigate("/animals");
        } else {
            navigate("/login");
        }
    };

   
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch((err) => console.error("Video playback error:", err));
        }

        // Initialize AOS for scroll animations
        AOS.init({ duration: 1000 });
    }, [currentVideoIndex]);

    return (
        <section className="relative h-screen bg-black text-white flex items-center justify-center overflow-hidden">
            {/* Video background */}
            <video
                ref={videoRef}
                autoPlay
                muted
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={handleVideoEnd}
            >
                <source src={videos[currentVideoIndex]} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

            {/* Text Content */}
            <div className="relative z-10 text-center px-6 sm:px-12" data-aos="fade-up">
                <motion.h1
                    className="text-6xl font-extrabold mb-6 tracking-wide leading-tight text-shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    Restoring Balance Between{" "}
                    <span className="text-yellow-400">Wildlife</span> And{" "}
                    <span className="text-yellow-400">Human Life</span>, Together.
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-8 font-light text-gray-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    Explore the wonders of nature at <span className="font-semibold">Zoomania!</span>
                </motion.p>

                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                    {/* Buy Tickets Button with Animation */}
                    <motion.button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => navigate("/buy-tickets")}
                        data-aos="fade-up"
                    >
                        Buy Tickets
                    </motion.button>

                    {/* Animals Button with Animation */}
                    <motion.button
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                        whileHover={{ scale: 1.1 }}
                        onClick={handleAnimalsClick}
                        data-aos="fade-up"
                    >
                        Animals
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
