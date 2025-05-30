import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/api/user/logout', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            localStorage.removeItem('token');
            // Redirect to login page if needed
        } catch (error) {
            console.log('error: ', error);
            setError(error.response?.data?.message || 'Logout failed');
        } finally {
            setLoading(false);
        }
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        margin: '20px auto',
        display: 'block'
    };

    const errorStyle = {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px'
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={loading} style={buttonStyle}>
                {loading ? 'Logging out...' : 'Log Out'}
            </button>
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    );
};

export default Logout;
