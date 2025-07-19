import { useContext, useEffect, useState } from 'react';
import { HosterContext } from '../contexts/HosterContext.jsx';
import '../styles/EventTickets.css';
import bin from '../assets/bin.png';
import edit from '../assets/pencil-write.png';
import ticketLogo from '../assets/ticketLogo.png';

function EventTickets({ onValidityChange }) {
  const { hosterData, setHosterData } = useContext(HosterContext);

  const [ticketTier, setTicketTier] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTicketId, setEditTicketId] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (Array.isArray(hosterData.tickets)) {
      setTickets(hosterData.tickets);
    }
  }, [hosterData]);

  useEffect(() => {
    if (onValidityChange) {
      onValidityChange(tickets.length > 0);
    }
  }, [tickets]);

  const syncTicketsToContext = (updated) => {
    setHosterData((prev) => ({ ...prev, tickets: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = editMode
      ? tickets.map((t) =>
          t.id === editTicketId
            ? { ...t, tier: ticketTier, price: ticketPrice, quantity: ticketQuantity }
            : t
        )
      : [
          ...tickets,
          {
            id: Date.now(),
            tier: ticketTier,
            price: ticketPrice,
            quantity: ticketQuantity,
          },
        ];

    setTickets(updated);
    syncTicketsToContext(updated);

    setTicketTier('');
    setTicketPrice('');
    setTicketQuantity('');
    setEditMode(false);
    setEditTicketId(null);
  };

  const handleEdit = (ticket) => {
    setTicketTier(ticket.tier);
    setTicketPrice(ticket.price);
    setTicketQuantity(ticket.quantity);
    setEditMode(true);
    setEditTicketId(ticket.id);
  };

  const handleDelete = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    syncTicketsToContext(updated);

    if (editTicketId === id) {
      setEditMode(false);
      setEditTicketId(null);
      setTicketTier('');
      setTicketPrice('');
      setTicketQuantity('');
    }
  };

  return (
    <div className="tickets-wrapper">
      <div className="tickets-box">
        <div className="tickets-box-header">
          <label className="tickets-label2">Event Tickets</label>
        </div>

        <div className="tickets-ticket-form" onSubmit={handleSubmit}>
          <div className="tickets-ticket-fields">
            <input
              className="tickets-simple-input"
              placeholder="Ticket Tier"
              value={ticketTier}
              onChange={(e) => setTicketTier(e.target.value)}
              required
              minLength={2}
              title="Enter a ticket tier name"
            />
            <input
              className="tickets-simple-input"
              placeholder="Quantity"
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(e.target.value)}
              required
              pattern="\d+"
              title="Enter a valid number for quantity"
            />
            <input
              className="tickets-simple-input"
              placeholder="Price"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              required
              pattern="\d+"
              title="Enter a valid number for price"
            />
          </div>

          <button type="button" className="tickets-add-ticket-button">
            {editMode ? 'Update Ticket' : 'Add Ticket'}
          </button>
        </div>

        {tickets.map((ticket) => (
          <div className="tickets-ticket-card" key={ticket.id}>
            <img src={ticketLogo} alt="ticket" className="tickets-ticket-img" />
            <span className="tickets-ticket-detail">{ticket.tier}</span>
            <span className="tickets-ticket-detail">Rs {ticket.price}</span>
            <span className="tickets-ticket-detail">{ticket.quantity} pcs</span>
            <div className="tickets-ticket-actions">
              <img
                src={edit}
                alt="edit"
                className="tickets-ticket-icon"
                onClick={() => handleEdit(ticket)}
              />
              <img
                src={bin}
                alt="delete"
                className="tickets-ticket-icon"
                onClick={() => handleDelete(ticket.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventTickets;


