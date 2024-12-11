import React from "react";
import { Link } from "react-router-dom";

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Check if there's a token stored
};

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zoomania</h1>
        <ul className="flex space-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isAuthenticated() ? (
            // Show these links if the user is authenticated
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
              <li><Link to="/buy-tickets">Buy Tickets</Link></li>
              <li><Link to="/login" onClick={() => {
                  localStorage.removeItem("token"); // Log out the user
                }}>Logout</Link></li>
            </>
          ) : (
            // Show these links if the user is not authenticated
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
