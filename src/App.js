import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import HomePage from './components/HomePage'; // Import the HomePage component
// import StatePage from './components/StatePage';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ListOfStates from './components/ListOfStates';
import ListOfCities from './components/ListOfCities';
import ListOfWarehouses from './components/ListOfWarehouses';

function App() {
    const getUserFromLocalStorage = () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };

    const [user, setUser] = useState(getUserFromLocalStorage);

    const handleLogin = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <Router>
            <div>
                <Navbar onLogout={handleLogout} user={user} />
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/state" element={<ListOfStates />} />
                            <Route path="/city" element={<ListOfCities />} />
                            <Route path="/wearhouse" element={<ListOfWarehouses />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
