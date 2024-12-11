import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Context
const AuthContext = createContext();

// AuthContext Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Holds user data if logged in
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there's a valid token stored in localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            // If there is a token, verify it (use your API to verify the token if necessary)
            setUser({ token: storedToken });
        }
    }, []);

    // Function to login
    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ token });
        navigate("/dashboard");
    };

    // Function to logout
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
