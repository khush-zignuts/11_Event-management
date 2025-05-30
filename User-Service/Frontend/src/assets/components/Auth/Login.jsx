import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ fcmToken }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, fcmToken });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/user/auth/login', formData);
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('username', res.data.data.username);
            localStorage.setItem('userId', res.data.data.userId);
            alert('Login successful');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
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
        gap: '12px'
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const linkStyle = {
        fontSize: '14px',
        color: '#007bff',
        cursor: 'pointer',
        marginTop: '5px',
        textAlign: 'center'
    };

    const errorStyle = {
        color: 'red',
        textAlign: 'center'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                style={inputStyle}
            />
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Login</button>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p style={linkStyle} onClick={() => navigate('/auth/forgot-password')}>Forgot Password?</p>
                <p style={linkStyle} onClick={() => navigate('/auth/change-password')}>Change Password</p>
            </div>

            {error && <p style={errorStyle}>{error}</p>}
        </form>
    );
};

export default Login;
