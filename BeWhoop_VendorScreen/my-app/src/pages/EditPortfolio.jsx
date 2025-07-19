import React, { useContext, useState, useRef } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/EditProfile.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import FileUploadSplit from '../additional_components/FileUpload.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditPortfolio() {
  const { vendorData, setVendorData } = useContext(VendorContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [minPrice, setMinPrice] = useState(vendorData?.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(vendorData?.maxPrice || '');

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const minPrice = form.minPrice.value.trim();
    const maxPrice = form.maxPrice.value.trim();
    const budgetRange = `$${minPrice}-$${maxPrice}`;

    if (!minPrice || !maxPrice) {
      toast.error('Both minimum and maximum price are required.');
      return;
    }

    if (parseInt(maxPrice) <= parseInt(minPrice)) {
      toast.error('Maximum price must be greater than minimum price.');
      return;
    }

    setVendorData((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
    }));

    setIsSubmitting(true);
    const loadingToast = toast.loading('Updating portfolio...');

    try {
      const res = await fetch(`${baseURL}/onboarding/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          fullName: vendorData.fullName,
          email: vendorData.email,
          phone: vendorData.phone || '0000000000',
          services: vendorData.services || [],
          budgetRange,
          city: vendorData.location,
          socialProof: vendorData.mapLink || '',
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Portfolio updated successfully.');
        navigate('/EditProfile');
      } else {
        toast.error('Failed to update portfolio.');
      }

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editportfolio-dashboard-container">
      <Sidebar />
      <div className="editportfolio-main-content">
        <Header />
        <div className="editportfolio-scrollable">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="editportfolio-form-wrapper">
              <label className="editportfolio-label3">Price Range</label>
              <div className="editportfolio-price-range">
                <input
                  name="minPrice"
                  className="editportfolio-input-range"
                  type="number"
                  min="0"
                  placeholder="Minimum"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  required
                />
                <input
                  name="maxPrice"
                  className="editportfolio-input-range"
                  type="number"
                  min="0"
                  placeholder="Maximum"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="editportfolio-upload">
              <FileUploadSplit />
            </div>

            <div className="editportfolio-save-button-container">
              <button type="submit" className="editportfolio-save-button" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPortfolio;
