import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/user/event/notifications', {
          headers: { Authorization: `Bearer ${token}` },
          params: { type, page, limit },
        });

        setNotifications(res.data.data.notifications);
        setTotalRecords(res.data.data.totalRecords);
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
        alert('Failed to load notifications');
      }
    };

    fetchNotifications();
  }, [type, page]);

  const totalPages = Math.ceil(totalRecords / limit);

  const boxStyle = {
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const getColor = (type) => {
    switch (type.toLowerCase()) {
      case 'event':
        return '#2196F3';
      case 'announcement':
        return '#FF9800';
      case 'reminder':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '30px 300px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Notifications</h1>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        >
          <option value="">All Types</option>
          <option value="event">Event</option>
          <option value="announcement">Announcement</option>
          <option value="reminder">Reminder</option>
        </select>
      </div>

      <div>
        {notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} style={{ ...boxStyle, borderLeft: `5px solid ${getColor(n.type)}` }}>
              <h3 style={{ marginBottom: 5 }}>{n.title}</h3>
              <p style={{ marginBottom: 8 }}>{n.message}</p>
              <span style={{ fontSize: 12, color: getColor(n.type) }}>Type: {n.type}</span>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '10px 15px', backgroundColor: '#777', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          ⬅ Back to Dashboard
        </button>

        <div>
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              style={{ marginRight: 10, padding: '10px 15px', borderRadius: 4, border: '1px solid #ccc' }}
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              style={{ padding: '10px 15px', borderRadius: 4, border: '1px solid #ccc' }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
