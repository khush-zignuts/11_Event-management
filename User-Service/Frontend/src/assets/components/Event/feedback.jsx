import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Feedback = () => {
    const { id } = useParams();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!rating || !comment) {
            alert('Please provide both rating and comment');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');

            await axios.post(
                `http://localhost:8000/api/user/event/submiteventfeedback`,
                { eventId: id, rating: Number(rating), comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Feedback submitted successfully!');
            navigate(`/event/event-details/${id}`);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            maxWidth: 500,
            margin: '30px 300px', fontFamily: 'sans-serif', padding: 20, border: '1px solid #ccc', borderRadius: 8
        }}>
            <h2>Give Feedback for Event</h2>

            <label htmlFor="rating" style={{ display: 'block', marginBottom: 5 }}>
                Rating (1-5):
            </label>
            <input
                type="number"
                id="rating"
                name="rating"
                value={rating}
                min="1"
                max="5"
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '100%', padding: 8, marginBottom: 15, borderRadius: 4, border: '1px solid #ccc' }}
                required
            />

            <label htmlFor="comment" style={{ display: 'block', marginBottom: 5 }}>
                Comment:
            </label>
            <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="5"
                placeholder="Write your feedback here..."
                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginBottom: 15 }}
                required
            />

            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    width: '100%',
                }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>

            <button
                onClick={() => navigate(`/event/event-details/${id}`)}
                style={{
                    marginTop: 10,
                    padding: '10px 15px',
                    backgroundColor: '#777',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    width: '100%',
                }}
            >
                Back to Event
            </button>
        </div>
    );
};

export default Feedback;
