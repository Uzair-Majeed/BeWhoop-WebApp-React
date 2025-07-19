import React, { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import toast from 'react-hot-toast'; // ✅ Import toast
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import VendorCard from '../additional_components/VendorCard.jsx';
import '../styles/VendorMarketplace.css';
import placeholderImage from '../assets/placeholder-image.png';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const VendorMarketplace = () => {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchVendors = async (query = '') => {
    try {
      const token = localStorage.getItem('token');
      const queryString = `?query=${encodeURIComponent(query.trim() || 'islamabad')}`;

      const response = await fetch(`${baseURL}/onboarding/search${queryString}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setVendors(result.vendors || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to fetch vendors'); // ✅ Toast error on failure
    }
  };

  const debouncedFetchVendors = useCallback(debounce(fetchVendors, 500), []);

  useEffect(() => {
    fetchVendors(); // initial fetch
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedFetchVendors(value);
  };

  return (
    <div className="vendor-dashboard-container">
      <Sidebar />
      <div className="vendor-main-content">
        <Header />
        <div className="vendor-scrollable">
          <div className="vendor-wrapper">
            <div className="vendor-topbar">
              <h2 className="vendor-heading">Vendor Marketplace</h2>
              <div className="vendor-search-container">
                <Search className="vendor-search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search by vendor name or city"
                  className="vendor-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div className="vendor-grid">
              {vendors.map((vendor, i) => (
                <VendorCard
                  key={i}
                  vendor={{
                    name: vendor.full_name,
                    role: vendor.services?.join(', ') || 'N/A',
                    location: vendor.city || 'Unknown',
                    priceRange: vendor.budget_range || 'N/A',
                    tags: vendor.services || [],
                  }}
                  image={placeholderImage}
                  onClick={() =>
                    navigate('/Vendor-Profile', {
                      state: {
                        vendor: {
                          id: vendor.id,
                          fullName: vendor.full_name,
                          services: vendor.services || [],
                          city: vendor.city,
                          budget: vendor.budget_range,
                        },
                        image: placeholderImage,
                      }
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorMarketplace;
