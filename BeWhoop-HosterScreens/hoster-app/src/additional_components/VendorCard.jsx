import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './VendorCard.css';

const VendorCard = ({ vendor, image, onClick, onTick }) => {
  return (
    <div className="vendor-card" onClick={onClick}>
      <img src={image} alt={vendor.name} className="vendor-image" />

      <div className="vendor-name-with-icon">
        <h3 className="vendor-name">{vendor.name}</h3>
        <FaCheckCircle
          className="vendor-check-icon-inline"
          onClick={(e) => {
            e.stopPropagation(); // Prevents card click when tick is clicked
            onTick && onTick();
          }}
        />
      </div>

      <p className="vendor-role">{vendor.role}</p>
      <p className="vendor-location">{vendor.location}</p>
      <p className="vendor-price">Price Range: {vendor.priceRange}</p>

      <div className="vendor-tags">
        {vendor.tags.map((tag, i) => (
          <span key={i} className="vendor-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default VendorCard;
