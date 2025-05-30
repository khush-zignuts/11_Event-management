import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post('http://localhost:8000/api/user/auth/reset-password', {
                email: formData.email,
                token,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            });
            setStatus(res.data.message || 'Password reset successful.');
            setTimeout(() => navigate('/auth/login'), 1500); // redirect after short delay
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password.');
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
        gap: '16px'
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '5px'
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const successStyle = {
        color: 'green',
        textAlign: 'center'
    };

    const errorStyle = {
        color: 'red',
        textAlign: 'center'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ textAlign: 'center' }}>Reset Password</h2>

            <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <div>
                <label htmlFor="newPassword" style={labelStyle}>New Password</label>
                <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <button type="submit" style={buttonStyle}>Reset Password</button>

            {status && <p style={successStyle}>{status}</p>}
            {error && <p style={errorStyle}>{error}</p>}
        </form>
    );
};

export default ResetPassword;
