import axios from 'axios';

// Base URL for the API (you can change this to the production API base URL when deployed)
const API_URL = "http://localhost:5000/api";

// Function to login a user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store the JWT token in localStorage
        }
        return response.data; // Return token or any other relevant data
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// Function to register a user
export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
        return response.data; // Return the user registration response
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

// Fetch animals
export const fetchAnimals = async () => {
    try {
        const response = await axios.get(`${API_URL}/animals`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Provide the token for authorization
            },
        });
        return response.data; // Return list of animals
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
};

// Function to add an animal
export const addAnimal = async (animalData) => {
    try {
        // Make the POST request to add an animal
        const response = await axios.post(`${API_URL}/animals`, animalData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token if needed
            },
        });
        return response.data; // Return the added animal data
    } catch (error) {
        console.error("Error adding animal:", error);
        throw error;
    }
};

// Update an animal
export const updateAnimal = async (animalId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/animals/${animalId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Provide token for authorization
            },
        });
        return response.data; // Return the updated animal data
    } catch (error) {
        console.error("Error updating animal:", error);
        throw error;
    }
};

// Delete an animal
export const deleteAnimal = async (animalId) => {
    try {
        const response = await axios.delete(`${API_URL}/animals/${animalId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Provide token for authorization
            },
        });
        return response.data; // Return the result of animal deletion
    } catch (error) {
        console.error("Error deleting animal:", error);
        throw error;
    }
};

// Fetch events
export const fetchEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request
            },
        });
        return response.data; // Return list of events
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

// Add a new event
export const addEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_URL}/events`, eventData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request
            },
        });
        return response.data; // Return the added event data
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};

// Update an event
export const updateEvent = async (eventId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/events/${eventId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request
            },
        });
        return response.data; // Return the updated event data
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

// Delete an event
export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${API_URL}/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Provide token for authorization
            },
        });
        return response.data; // Return the result of event deletion
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

// Fetch tickets
export const fetchTickets = async () => {
    try {
        const response = await axios.get(`${API_URL}/tickets`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Provide token for authorization
            },
        });
        return response.data; // Return list of tickets
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
};

// Delete a ticket
export const deleteTicket = async (ticketId) => {
    try {
        const response = await axios.delete(`${API_URL}/tickets/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Provide token for authorization
            },
        });
        return response.data; // Return the result of ticket deletion
    } catch (error) {
        console.error("Error deleting ticket:", error);
        throw error;
    }
};
