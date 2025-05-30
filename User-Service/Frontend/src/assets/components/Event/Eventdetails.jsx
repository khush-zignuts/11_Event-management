import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(`http://localhost:8000/api/user/event/getEventById/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvent(res.data.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        alert('Failed to fetch event details');
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const buttonStyle = {
    padding: '10px 15px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div style={{ maxWidth: 600, margin: '30px 300px', fontFamily: 'sans-serif', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>{event.title}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {new Date(Number(event.date)).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
      <p><strong>Location:</strong> {event.location}</p>

      <div style={{ marginTop: 20 }}>
        <button
          style={{ ...buttonStyle, backgroundColor: '#2196F3', color: 'white' }}
          onClick={() => navigate(`/Book/event/${id}`)}
        >
          Book Event
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#777', color: 'white' }}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#2196F3', color: 'white' }}
          onClick={() => navigate(`/event/chat/${id}`)}
        >
          Chat
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#4CAF50', color: 'white' }}
          onClick={() => navigate(`/event/feedback/${id}`)}
        >
          Give Feedback
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
