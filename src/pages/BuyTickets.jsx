import React, { useState, useEffect } from "react";
import { fetchEvents } from "../services/api";

const BuyTickets = () => {
    const [events, setEvents] = useState([]); // State to store the events
    const [errorMessage, setErrorMessage] = useState(""); // State for error message

    useEffect(() => {
        const getEvents = async () => {
            try {
                const fetchedEvents = await fetchEvents(); // Fetch events from API
                setEvents(fetchedEvents); // Set the events to state
            } catch (error) {
                setErrorMessage("Failed to load events.");
            }
        };

        getEvents(); // Call getEvents when component mounts
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Background video */}
            <div className="absolute inset-0">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    className="object-cover w-full h-full opacity-50"
                >
                    <source src="/videos/2558530-hd_1920_1080_25fps.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Buy Tickets Content */}
            <div className="relative z-10 text-center px-6 py-16 sm:py-24 md:px-12 lg:px-24 text-white">
                <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-shadow-md">Buy Your Tickets Now</h1>
                <p className="text-lg sm:text-xl mb-8 text-shadow-md">Purchase tickets to visit Zoomania and explore the wonders of wildlife!</p>
                
                {/* Event Selection Form */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Error Message */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left mx-auto max-w-4xl">
                    {events && events.length > 0 ? (
                        events.map((event) => (
                            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300" key={event._id}>
                                <h2 className="text-2xl font-semibold text-gray-900">{event.title}</h2>
                                <p className="text-sm mt-2 text-gray-600">{event.date}</p>
                                <p className="text-lg font-bold mt-2 text-gray-800">${event.price || 0} per ticket</p>
                                <input 
                                    type="number" 
                                    placeholder="Quantity" 
                                    className="mt-4 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No events available at the moment.</p>
                    )}
                </div>

                {/* Button */}
                <div className="mt-8">
                    <button 
                        className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black bg-opacity-90 text-white py-4 mt-16 text-center">
                <p>&copy; 2024 Zoomania. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BuyTickets;
