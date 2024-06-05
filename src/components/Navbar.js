// import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout, user }) {
    const navbarStyle = {
        backgroundColor: '#7d58b3', 
        padding: '10px 20px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        marginRight: '20px',
    };

    const buttonStyle = {
        backgroundColor: '#fff',
        color: '#7d58b3',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <nav style={navbarStyle}>
            <h2>DigitalFlake</h2>
            <div>
                {user ? (
                    <>
                        <Link to="/" style={linkStyle}>Home</Link>
                        <Link to="/state" style={linkStyle}>State</Link>
                        <Link to="/city" style={linkStyle}>City</Link>
                        <Link to="/wearhouse" style={linkStyle}>Wearhouse</Link>
                        <button onClick={onLogout} style={buttonStyle}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/signup" style={linkStyle}>Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
