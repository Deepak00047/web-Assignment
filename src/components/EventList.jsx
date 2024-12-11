// src/components/EventList.jsx

import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api'; // Import the function to fetch events

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");

    // Fetch events when the component mounts
    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEvents(); // Call the fetchEvents function
                setEvents(eventsData); // Set events data to state
            } catch (err) {
                console.error("Error fetching events:", err);
                setError("Failed to load events.");
            }
        };
        getEvents(); // Fetch events
    }, []);

    return (
        <div className="px-6 py-12 bg-gray-100">
            <h2 className="text-4xl font-semibold text-center mb-6">Upcoming Events</h2>
            {error && <p className="text-center text-red-500">{error}</p>} {/* Show error message if any */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                            <p className="mt-4 text-gray-700">{event.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No events available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default EventList;
