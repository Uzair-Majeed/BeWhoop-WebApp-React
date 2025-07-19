import React, { createContext, useState } from 'react';

export const HosterContext = createContext();

export const HosterProvider = ({ children }) => {
  const [hosterData, setHosterData] = useState({
    fullName: '',
    email : '',
    password : '',
    eventFrequency : '',
    avgSize : 0,
    eventTypes : [],
    location : '',
    customURL:'',
    startTime:Date.now(),
    endTime:Date.now(),
    tickets: [],
    bankDetails:{
      selectedBank:'',
      accountNo:'',
      accountName:'',
    },
    portfolio: [],
    profilePhoto: null,
    eventIDs: [],
  });

  return (
    <HosterContext.Provider value={{ hosterData, setHosterData }}>
      {children}
    </HosterContext.Provider>
  );
};
