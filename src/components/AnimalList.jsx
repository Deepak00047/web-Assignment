import React, { useState, useEffect } from "react";
import { fetchAnimals } from "../services/api";

const AnimalList = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAnimals = async () => {
            try {
                const data = await fetchAnimals();
                setAnimals(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch animals");
                setLoading(false);
            }
        };

        getAnimals();
    }, []);

    if (loading) {
        return <div className="text-center text-lg font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Animals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animals.map((animal) => (
                    <div
                        key={animal._id}
                        className="border rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                        <img
                            src={animal.image || "https://via.placeholder.com/150"}
                            alt={animal.name}
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                        <h3 className="text-xl font-semibold">{animal.name}</h3>
                        <p className="text-gray-600">{animal.species}</p>
                        <p className="text-gray-600">{animal.habitat}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimalList;
