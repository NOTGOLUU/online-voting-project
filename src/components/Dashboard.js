// src/components/Dashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css'; // Create and style as needed
import CandidateList from './CandidateList';

const Dashboard = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome, User ID: {auth.user ? auth.user.id : 'Unknown'}</p>
            {/* Add more dashboard functionalities here */}
            <CandidateList/>
        </div>
    );
};

export default Dashboard;
