import React, { useState, useEffect } from "react";
import { addEvent, fetchEvents, deleteEvent, updateEvent } from "../services/api"; 
import { fetchAnimals, deleteAnimal, addAnimal, updateAnimal } from "../services/api"; 
import { fetchTickets, deleteTicket } from "../services/api"; 

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
    const [newAnimal, setNewAnimal] = useState({ name: "", habitat: "", diet: "", facts: "" });
    const [updatedEvent, setUpdatedEvent] = useState({ title: "", date: "", description: "" });
    const [updatedAnimal, setUpdatedAnimal] = useState({ name: "", habitat: "", diet: "", facts: "" });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const eventData = await fetchEvents();
                setEvents(eventData);

                const animalData = await fetchAnimals();
                setAnimals(animalData);

                const ticketData = await fetchTickets();
                setTickets(ticketData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        loadData();
    }, []);

    // ADD EVENT
    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!newEvent.title || !newEvent.date || !newEvent.description) {
            setErrorMessage("Please fill in all fields.");
            return;
        }
        try {
            const addedEvent = await addEvent(newEvent);
            setEvents([...events, addedEvent]);
            setNewEvent({ title: "", date: "", description: "" });
            setErrorMessage(""); // Clear the error message
        } catch (error) {
            setErrorMessage("Failed to add event. Please try again.");
        }
    };

    // ADD ANIMAL
    const handleAddAnimal = async (e) => {
        e.preventDefault();
        if (!newAnimal.name || !newAnimal.habitat || !newAnimal.diet || !newAnimal.facts) {
            setErrorMessage("Please fill in all fields.");
            return;
        }
        try {
            const addedAnimal = await addAnimal(newAnimal);
            setAnimals([...animals, addedAnimal]);
            setNewAnimal({ name: "", habitat: "", diet: "", facts: "" });
            setErrorMessage(""); // Clear the error message
        } catch (error) {
            setErrorMessage("Failed to add animal. Please try again.");
        }
    };

    // DELETE EVENT
    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId);
            setEvents(events.filter((event) => event._id !== eventId));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    // DELETE ANIMAL
    const handleDeleteAnimal = async (animalId) => {
        try {
            await deleteAnimal(animalId);
            setAnimals(animals.filter((animal) => animal._id !== animalId));
        } catch (error) {
            console.error("Error deleting animal:", error);
        }
    };

    // DELETE TICKET
    const handleDeleteTicket = async (ticketId) => {
        try {
            await deleteTicket(ticketId);
            setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    // UPDATE EVENT
    const handleUpdateEvent = async (eventId) => {
        try {
            const updatedData = await updateEvent(eventId, updatedEvent);
            setEvents(events.map((event) => (event._id === eventId ? updatedData : event)));
            setUpdatedEvent({ title: "", date: "", description: "" });
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    // UPDATE ANIMAL
    const handleUpdateAnimal = async (animalId) => {
        try {
            const updatedData = await updateAnimal(animalId, updatedAnimal);
            setAnimals(animals.map((animal) => (animal._id === animalId ? updatedData : animal)));
            setUpdatedAnimal({ name: "", habitat: "", diet: "", facts: "" });
        } catch (error) {
            console.error("Error updating animal:", error);
        }
    };

    return (
        <div className="admin-dashboard-container bg-gray-50 min-h-screen">
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

                {/* Error Message */}
                {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

                {/* Manage Events */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
                    <form onSubmit={handleAddEvent} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title:</label>
                            <input
                                type="text"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                placeholder="Enter event title"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date:</label>
                            <input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description:</label>
                            <textarea
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                placeholder="Enter event description"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all">
                            Add Event
                        </button>
                    </form>

                    <div className="mt-8 overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-4 text-left">Title</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-left">Description</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event._id} className="border-t">
                                        <td className="p-4">{event.title}</td>
                                        <td className="p-4">{event.date}</td>
                                        <td className="p-4">{event.description}</td>
                                        <td className="p-4">
                                            <button onClick={() => handleUpdateEvent(event._id)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">Update</button>
                                            <button onClick={() => handleDeleteEvent(event._id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-2">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Manage Animals */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Manage Animals</h2>
                    <form onSubmit={handleAddAnimal} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={newAnimal.name}
                                onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
                                placeholder="Enter animal name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Habitat:</label>
                            <input
                                type="text"
                                value={newAnimal.habitat}
                                onChange={(e) => setNewAnimal({ ...newAnimal, habitat: e.target.value })}
                                placeholder="Enter habitat"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Diet:</label>
                            <input
                                type="text"
                                value={newAnimal.diet}
                                onChange={(e) => setNewAnimal({ ...newAnimal, diet: e.target.value })}
                                placeholder="Enter diet"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">Facts:</label>
                            <textarea
                                value={newAnimal.facts}
                                onChange={(e) => setNewAnimal({ ...newAnimal, facts: e.target.value })}
                                placeholder="Enter animal facts"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all">
                            Add Animal
                        </button>
                    </form>
                    
                    <div className="mt-8">
                        {animals.map((animal) => (
                            <div key={animal._id} className="animal-card bg-white p-6 rounded-lg shadow-lg mb-4">
                                <p className="text-xl">{animal.name}</p>
                                <button onClick={() => handleUpdateAnimal(animal._id)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 ml-2">Update</button>
                                <button onClick={() => handleDeleteAnimal(animal._id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-2">Delete</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Manage Tickets */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Manage Tickets</h2>
                    {tickets.map((ticket) => (
                        <div key={ticket._id} className="ticket-card bg-white p-6 rounded-lg shadow-lg mb-4">
                            <p className="text-xl">{ticket.user} - {ticket.event}</p>
                            <button onClick={() => handleDeleteTicket(ticket._id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete Ticket</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
