import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Named import

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        user: null,
    });

    useEffect(() => {
        if (auth.token) {
            try {
                const decoded = jwtDecode(auth.token);
                setAuth(prevState => ({
                    ...prevState,
                    user: { id: decoded.id, is_admin: decoded.is_admin },
                }));
            } catch (error) {
                console.error('Invalid token:', error);
                logout(); // Call logout on invalid token
            }
        }
    }, [auth.token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({
            token,
            user: null, // User details will be set in useEffect
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            token: null,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; // Default export
