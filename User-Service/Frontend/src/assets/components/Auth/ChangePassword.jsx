import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(
                'http://localhost:8000/api/user/auth/change-password',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(res.data.message || 'Password changed successfully');
            setFormData({ currentPassword: '', newPassword: '' });
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to change password'
            );
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
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#ff9800',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    };

    const successStyle = {
        color: 'green',
        textAlign: 'center',
    };

    const errorStyle = {
        color: 'red',
        textAlign: 'center',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ textAlign: 'center' }}>Change Password</h2>

            <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>Change Password</button>

            {success && <p style={successStyle}>{success}</p>}
            {error && <p style={errorStyle}>{error}</p>}
        </form>
    );
};

export default ChangePassword;
