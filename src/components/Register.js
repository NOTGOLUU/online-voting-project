// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Ensure this path is correct
import { REACT_BACKEND_URL } from '../config';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        try {
            // Update the API endpoint to /api/auth/register
            const response = await axios.post(`${REACT_BACKEND_URL}/api/auth/register`, {
                username,
                password,
            });
            setMessage(response.data.message);
            setUsername('');
            setPassword('');
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Registration failed');
            } else {
                setMessage('Registration failed');
            }
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Register;
