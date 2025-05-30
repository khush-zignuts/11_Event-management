import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '', phoneNumber: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/user/auth/signup', formData);
            navigate('/auth/verify-otp', { state: { email: formData.email } });
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    const formStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '80px 300px',
        padding: '30px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const errorStyle = {
        color: 'red',
        textAlign: 'center'
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} placeholder="Name" required style={inputStyle} />
            <input name="email" onChange={handleChange} placeholder="Email" required style={inputStyle} />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" required style={inputStyle} />
            <input name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required style={inputStyle} />
            <button type="submit" style={buttonStyle}>Sign Up</button>

            {error && <p style={errorStyle}>{error}</p>}

            <p style={{ textAlign: 'center' }}>
                Already have an account? <Link to="/auth/login">Log in</Link>
            </p>
        </form>
    );
};

export default Signup;
