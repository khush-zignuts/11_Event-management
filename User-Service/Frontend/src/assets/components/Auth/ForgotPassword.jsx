import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/user/auth/forgot-password', {
        email,
      });
      setStatus(res.data.message || 'Password reset link sent.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link.');
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
    backgroundColor: '#2196f3',
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
      <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Send Reset Link</button>

      {status && <p style={successStyle}>{status}</p>}
      {error && <p style={errorStyle}>{error}</p>}
    </form>
  );
};

export default ForgotPassword;
