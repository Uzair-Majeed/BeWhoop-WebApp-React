import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import '../styles/MyEvents.css';
import placeholderImage from '../assets/events_placeholder.jpg';
import toast from 'react-hot-toast'; // ✅ Import toast

const baseURL = import.meta.env.VITE_API_BASE_URL;

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch events from backend
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("🔐 Token:", token);

      const response = await fetch(`${baseURL}/vendor/events`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("📡 Response Status:", response.status);

      const result = await response.json();
      console.log("📦 Response Body:", result);

      if (!response.ok) {
        toast.error('Failed to fetch events'); // ✅ Toast for failed response
        throw new Error(result?.message || 'Failed to fetch events');
      }

      setEvents(result.events || []);
    } catch (error) {
      console.error('❌ Error fetching events:', error.message);
      toast.error('Error fetching events'); // ✅ Toast for catch block
    }
  };

  useEffect(() => {
    fetchEvents();
    
    // Dummy data used previously for UI testing
    /*
    const dummyEvents = [
      {
        id: '1',
        user_id: 'user123',
        title: 'Wedding Ceremony',
        description: 'A beautiful outdoor wedding event with floral arrangements.',
        location: 'Lahore',
        event_type: 'Wedding',
        created_at: '2025-07-10T12:00:00.000Z',
        attendee_count: 120,
        media: ['https://images.unsplash.com/photo-1503428593586-e225b39bddfe', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'],
        categories: ['Outdoor', 'Formal']
      },
      {
        id: '2',
        user_id: 'user456',
        title: 'Corporate Meetup',
        description: 'A corporate networking event for industry professionals.',
        location: 'Karachi',
        event_type: 'Corporate',
        created_at: '2025-07-11T14:30:00.000Z',
        attendee_count: 75,
        media: [],
        categories: ['Indoor', 'Business']
      },
      {
        id: '3',
        user_id: 'user789',
        title: 'Birthday Bash',
        description: 'A colorful birthday celebration for kids and family.',
        location: 'Islamabad',
        event_type: 'Birthday',
        created_at: '2025-07-12T18:00:00.000Z',
        attendee_count: 50,
        media: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'],
        categories: ['Fun', 'Family']
      }
    ];
    setEvents(dummyEvents);
    */
  }, []);

  return (
    <div className="my-events-container">
      <Sidebar />
      <div className="my-events-main">
        <Header />
        <div className="my-events-content">
          <h2 className="my-events-title">My Events</h2>
          <div className="events-grid">
            {events.map((event, i) => (
              <div
                key={i}
                className="event-card"
                onClick={() => navigate('/EventDetails', { state: { event } })}
              >
                <img
                  src={event.media?.[0] || placeholderImage}
                  alt="Event"
                  className="event-image"
                />
                <div className="event-info">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-location">{event.location}</p>
                  <p className="event-type">{event.event_type}</p>
                  <p className="event-date">{new Date(event.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {events.length === 0 && <p className="no-events">No events found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
