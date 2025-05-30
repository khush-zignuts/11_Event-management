import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllBookedEvents = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8000/api/user/book/getAllBookedEventsOrById', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
          },
        });

        setBookedEvents(response.data.data.events);
        const total = response.data.data.totalRecords;
        const limit = 10;
        setTotalPages(Math.ceil(total / limit));
      } catch (error) {
        console.error('Error fetching booked events:', error);
        alert('Failed to fetch booked events');
      }
    };

    fetchBookedEvents();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '40px auto',
      fontFamily: 'Arial, sans-serif',
      padding: '0 15px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    eventGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#f9f9f9',
    },
    button: {
      padding: '8px 12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    backButton: {
      padding: '8px 12px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '30px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>📚 Your Booked Events</h2>
        <button style={styles.backButton} onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={styles.eventGrid}>
        {bookedEvents.length === 0 ? (
          <p>No booked events found.</p>
        ) : (
          bookedEvents.map((event) => (
            <div style={styles.card} key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(Number(event.date)).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Category:</strong> {event.category}</p>

              <button
                style={styles.button}
                onClick={() => navigate(`/event/event-details/${event.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      <div style={styles.pagination}>
        {currentPage > 1 && (
          <button style={styles.button} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button style={styles.button} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default AllBookedEvents;
