import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; // Create and style as needed

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Updated from useHistory

    const handleLogout = () => {
        logout();
        navigate('/login'); // Updated to use navigate
    };

    return (
        <nav className="navbar">
            <h1>Online Voting System</h1>
            <ul>
                {!auth.token ? (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/results">Results</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
