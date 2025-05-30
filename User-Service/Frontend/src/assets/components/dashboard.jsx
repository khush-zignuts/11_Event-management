import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8000/api/user/event/search`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { query, page: currentPage },
        });

        setEvents(res.data.data.events);
        setTotalPages(res.data.data.totalPages);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events');
      }
    };

    fetchEvents();
  }, [query, currentPage]);

  const handleSearchChange = (e) => setQuery(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);


  const containerStyle = {
    maxWidth: '100vw',
    margin: '40px 200px',
    padding: '20px',
    fontFamily: 'sans-serif',
  };


  const headerStyle = {
    marginBottom: '30px',
  };

  const controlsRow = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '15px',
    alignItems: 'center',
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    backgroundColor: '#2196f3',
    color: 'white',
  };

  const searchInputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    flex: '1',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  const viewButtonStyle = {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '30px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Welcome, {localStorage.getItem('username')}</h1>
        <h2>All Events</h2>

        <div style={controlsRow}>
          <button style={buttonStyle} onClick={() => navigate('/event/notifications')}>🔔 Notifications</button>
          <button style={buttonStyle} onClick={() => navigate('/Book/AllBookedEvents')}>📚 All Booked Events</button>
          <input
            type="text"
            placeholder="Search for an event..."
            value={query}
            onChange={handleSearchChange}
            style={searchInputStyle}
          />
          <button style={{ ...buttonStyle, backgroundColor: '#f44336' }} onClick={() => navigate('/auth/logout')}>
            Logout
          </button>
        </div>
      </div>

      <div style={gridStyle}>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div key={event.id} style={cardStyle}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(Number(event.date)).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <button style={viewButtonStyle} onClick={() => navigate(`/event/event-details/${event.id}`)}>View</button>
            </div>
          ))
        )}
      </div>

      <div style={paginationStyle}>
        {currentPage > 1 && (
          <button style={buttonStyle} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button style={buttonStyle} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
