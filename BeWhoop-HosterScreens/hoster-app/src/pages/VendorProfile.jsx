import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'; // ✅ Import toast
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import '../styles/VendorProfile.css';

function VendorProfile() {
  const location = useLocation();
  const { vendor, image } = location.state || {};

  useEffect(() => {
    if (!vendor) {
      toast.error('Vendor not found. Please return to Marketplace.'); // ✅ Toast error on missing vendor
    }
  }, [vendor]);

  if (!vendor) {
    return (
      <div className="ven-prof-dashboard-container">
        <Sidebar />
        <div className="ven-prof-main-content">
          <Header />
          <div className="ven-prof-scrollable">
            <h2>Vendor Not Found</h2>
            <p>Please return to the Marketplace and select a vendor.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ven-prof-dashboard-container">
      <Sidebar />
      <div className="ven-prof-main-content">
        <Header />
        <div className="ven-prof-scrollable">
          <div className="ven-prof-dashboard-body">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={image}
                alt="Profile"
                className="ven-prof-profile-avatar"
              />
            </div>
            <h2>{vendor.fullName}</h2>
            <p className="ven-prof-services">
              {vendor.services.length > 0
                ? vendor.services.join(', ')
                : 'No services listed'}
            </p>
            <div className="dash-info">
                <h3>Price Range : {vendor.budget}</h3>
                <hr className="dash-divider" />
                <h3>Location : {vendor.city || '-'}</h3>
            </div>
          </div>

          <div className="ven-prof-dashboard-body">
            <p>
              Reference site about Lorem Ipsum, giving information on its
              origins, as well as a random Lipsum generator.
            </p>
          </div>

          <div className="ven-prof-portfolio-grid">
            {/* Future placeholder for portfolio items */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProfile;
