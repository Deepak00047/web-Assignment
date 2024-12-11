import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // Import registerUser function

const Register = () => {
    const [userName, setUserName] = useState(""); // Changed `name` to `userName`
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Error message state
    const navigate = useNavigate(); // Use navigate to redirect after successful registration

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!email || !password || !confirmPassword || !userName) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            // Call the registerUser function with the necessary data
            const response = await registerUser(userName, email, password);

            // On successful registration, redirect to the login page
            if (response) {
                console.log(response); // Handle the successful registration response
                navigate("/login"); // Redirect to login page
            }
        } catch (error) {
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center relative">
            {/* Background Video */}
            <video 
                autoPlay 
                muted 
                loop
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/5362421-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

            {/* Registration Form */}
            <div className="w-full max-w-md p-8 bg-white bg-opacity-75 rounded-lg shadow-lg z-10">
                <h2 className="text-3xl text-center text-blue-800 font-semibold mb-6">Register a New Account</h2>

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} // Handle input changes for userName
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Handle input changes for email
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Handle input changes for password
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Handle input changes for confirmPassword
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                    >
                        Register
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">Already have an account?</span>
                        <a href="/login" className="text-sm text-blue-600 hover:underline"> Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
