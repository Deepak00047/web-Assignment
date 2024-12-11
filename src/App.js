import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard'; 
import AdminDashboard from './pages/AdminDashboard'; 
import BuyTickets from './pages/BuyTickets'; 
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/buy-tickets" element={<BuyTickets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
