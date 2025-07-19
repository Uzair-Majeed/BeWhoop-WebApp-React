import React, { createContext, useState } from 'react';

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendorData, setVendorData] = useState({
    fullName: '',
    email : '',
    phone:'00000000000',
    profileImage: null,
    description: '',
    services: [],
    location: '',
    mapLink: '',
    minPrice: 0,
    maxPrice: 0,
    cnicFront: null,
    cnicBack: null,
    portfolio: [],
  });

  return (
    <VendorContext.Provider value={{ vendorData, setVendorData }}>
      {children}
    </VendorContext.Provider>
  );
};
