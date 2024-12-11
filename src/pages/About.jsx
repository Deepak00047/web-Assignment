import React, { useEffect, useState } from "react";

// Typewriter effect for title only
const useTypewriter = (text, speed) => {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index += 1;
            if (index === text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return displayedText;
};

const About = () => {
    const titleText = "Welcome to Zoomania, where we strive to bridge the gap between humans and wildlife. Our mission is to raise awareness about animal conservation and provide a unique experience to our visitors.";
    const missionText = "Our mission is to foster a deep connection between people and animals through education, entertainment, and conservation efforts. We aim to educate people of all ages about the importance of preserving wildlife and the natural world.";
    const visionText = "We envision a future where people are more aware of their role in wildlife conservation and take active steps to protect endangered species. By working together, we can create a safer world for animals while also benefiting humanity through sustainable solutions and eco-tourism.";

    const displayedTitleText = useTypewriter(titleText, 80);  // Typewriter effect only on the title
    const displayedMissionText = missionText;  // Static Mission text
    const displayedVisionText = visionText;  // Static Vision text

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src="/zoo2.jpg" 
                    alt="Zoo Background" 
                    className="object-cover w-full h-full opacity-60"
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* About Content */}
            <div className="relative z-10 px-6 py-16 sm:py-24 md:px-12 lg:px-24 text-white text-center">
                <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">{displayedTitleText}</h1>
                <p className="text-xl sm:text-2xl mb-8">
                    {displayedTitleText ? "Learn more about our mission and vision" : ""}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-semibold">Our Mission</h2>
                        <p>{displayedMissionText}</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-semibold">Our Vision</h2>
                        <p>{displayedVisionText}</p>
                    </div>
                </div>

                {/* Optional Call-to-Action Button */}
                <div className="mt-8">
                    <a 
                        href="/buy-tickets" 
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    >
                        Join Us - Buy Tickets
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark bg-opacity-90 text-white py-4 mt-16 text-center">
                <p>&copy; 2024 Zoomania. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
