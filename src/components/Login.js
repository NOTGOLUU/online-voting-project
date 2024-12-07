// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import { REACT_BACKEND_URL } from '../config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); 
        
        // Verify that the environment variable is loaded
        console.log('REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);

        // Use environment variable or a fallback URL for testing
        const loginUrl = `${REACT_BACKEND_URL || 'http://localhost:3000'}/api/auth/login`;
        console.log('Login URL:', loginUrl);

        try {
            const response = await axios.post(loginUrl, {
                username,
                password,
            });
            setMessage(response.data.message);
            login(response.data.token); 
            setUsername('');
            setPassword('');
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Login error:', error); 
            if (error.response) {
                console.log('Response data:', error.response.data);
                setMessage(error.response.data.message || 'Login failed');
            } else {
                setMessage('Login failed');
            }
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
