import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar'; // Optional: Create a Navbar component
import PrivateRoute from './components/PrivateRoute'; // We'll create this component next
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './App.css';
import Result from './components/Result';

const App = () => {
    return (
        <AuthProvider>  {/* Wrap your app with AuthProvider */}
            <Router>
                <Navbar /> {/* Optional: Include navigation links */}
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        {/* Add more routes as needed */}
                        <Route path="/results" element={<Result/>}/>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

// Simple Home Component
const Home = () => (
    <div>
        <h2>Welcome to the Online Voting System</h2>
        <p>Please register or login to continue.</p>
    </div>
);

export default App;
