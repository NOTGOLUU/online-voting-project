import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; // Change Redirect to Navigate
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Ensure you're using the correct import

const PrivateRoute = ({ component: Component,children }) => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token) {
            const decoded = jwtDecode(auth.token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                logout();
                navigate('/login')
            }
        }
    }, [auth.token, logout]);

    return (
        <div>
            {children}
        </div>

              
    );
};

export default PrivateRoute;
