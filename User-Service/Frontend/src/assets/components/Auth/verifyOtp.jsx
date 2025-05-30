import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/user/auth/verifyOTP', { email, otp });
            navigate('/auth/login');
        } catch (err) {
            setError(err.response?.data?.message || 'OTP verification failed');
        }
    };

    const formStyle = {
        maxWidth: '400px',
        margin: '80px 300px',
        padding: '30px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        textAlign: 'center',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    };

    const errorStyle = {
        color: 'red',
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h3>Enter OTP sent to:</h3>
            <p style={{ fontWeight: 'bold' }}>{email}</p>

            <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Verify OTP</button>
            {error && <p style={errorStyle}>{error}</p>}
        </form>
    );
};

export default VerifyOTP;
