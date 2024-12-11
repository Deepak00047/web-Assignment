import React, { useState, useEffect } from "react";
import { fetchAnimals, fetchEvents, fetchTickets } from "../services/api"; // Importing the fetch functions

const Dashboard = () => {
    const [animals, setAnimals] = useState([]);
    const [events, setEvents] = useState([]);
    const [tickets, setTickets] = useState([]);

    // Fetch animals, events, and tickets when the component mounts
    useEffect(() => {
        const loadData = async () => {
            try {
                const animalData = await fetchAnimals();
                setAnimals(animalData); // Set the fetched animals data

                const eventData = await fetchEvents();
                setEvents(eventData); // Set the fetched events data

                const ticketData = await fetchTickets();
                setTickets(ticketData); // Set the fetched tickets data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        loadData();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Video background */}
            <div className="relative h-screen w-full">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/videos/2554576-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

                {/* Dashboard Content */}
                <div className="relative z-10 p-6 md:p-16">
                    <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>

                    {/* Displaying Animals */}
                    <h2 className="text-2xl text-white mb-4">Animals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {animals.map((animal) => (
                            <div key={animal._id} className="animal-card bg-white p-4 rounded-lg shadow-lg">
                                {/* Dynamically display animal images */}
                                <img src={`/images/${animal.name.toLowerCase()}.webp`} alt={animal.name} className="animal-image w-full h-48 object-cover rounded-md mb-4" />
                                <h2 className="animal-name text-xl font-semibold text-gray-800">{animal.name}</h2>
                                <p className="animal-details text-gray-600">Habitat: {animal.habitat}</p>
                                <p className="animal-details text-gray-600">Diet: {animal.diet}</p>
                                <p className="animal-facts text-gray-500">Facts: {animal.facts}</p>
                            </div>
                        ))}
                    </div>

                    {/* Displaying Events */}
                    <h2 className="text-2xl text-white mb-4 mt-8">Events</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event._id} className="event-card bg-white p-4 rounded-lg shadow-lg">
                                <h2 className="event-name text-xl font-semibold text-gray-800">{event.title}</h2>
                                <p className="event-date text-gray-600">Date: {event.date}</p>
                                <p className="event-description text-gray-500">Description: {event.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Displaying Tickets */}
                    <h2 className="text-2xl text-white mb-4 mt-8">Tickets</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tickets.map((ticket) => (
                            <div key={ticket._id} className="ticket-card bg-white p-4 rounded-lg shadow-lg">
                                <p className="ticket-user text-gray-600">User: {ticket.user}</p>
                                <p className="ticket-event text-gray-600">Event: {ticket.event}</p>
                                <p className="ticket-quantity text-gray-600">Quantity: {ticket.quantity}</p>
                                <p className="ticket-price text-gray-500">Total Price: {ticket.totalPrice}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
