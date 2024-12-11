import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // Import loginUser function

const Login = () => {
    const [email, setEmail] = useState(""); // Manage the email field
    const [password, setPassword] = useState(""); // Manage the password field
    const [errorMessage, setErrorMessage] = useState(""); // Manage error messages
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const navigate = useNavigate(); // Navigate to different routes

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            // Call the login API function
            const response = await loginUser(email, password); // Passing email and password

            // If login is successful, store the JWT token in localStorage
            if (response.token) {
                localStorage.setItem("token", response.token); // Store the token

                // Redirect based on role (admin or user)
                const userRole = response.role; // Assuming the backend returns the role
                if (userRole === 'admin') {
                    navigate("/admin-dashboard"); // Redirect to admin dashboard
                } else {
                    navigate("/dashboard"); // Redirect to user dashboard
                }
            }
        } catch (error) {
            setErrorMessage("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/zoo.jpg')" }}>
            <div className="w-full max-w-md p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
                <h2 className="text-3xl text-center text-blue-800 font-semibold mb-6">Login to Your Account</h2>

                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Handle email input change
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Handle password input change
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>} {/* Show error message if login fails */}

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                    >
                        Login
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">Don't have an account?</span>
                        <a href="/register" className="text-sm text-blue-600 hover:underline"> Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
