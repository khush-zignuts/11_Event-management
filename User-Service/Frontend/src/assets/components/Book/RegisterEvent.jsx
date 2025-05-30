import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RegisterEvent = () => {
  const { id } = useParams();
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBook = async () => {
    try {
      setIsLoading(true);
      setStatusMessage('');
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `http://localhost:8000/api/user/book/event/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStatusMessage(res.data.message || 'Booking successful.');
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Failed to book the event.';
      setStatusMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <button
        onClick={handleBook}
        disabled={isLoading}
        style={{
          margin: '80px 300px',
          display: 'block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {isLoading ? 'Booking...' : 'Book This Event'}
      </button>

      {statusMessage && (
        <p
          style={{
            marginTop: '1rem',
            color: statusMessage.toLowerCase().includes('success') ? 'green' : '#d9534f',
            fontWeight: 'bold'
          }}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default RegisterEvent;
