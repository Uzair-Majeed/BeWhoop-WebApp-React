import React from 'react';
import '../styles/PlaceHolder.css';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';

function Placeholder() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="scrollable">
          <div className="placeholder-box">
            <h1>Placeholder Page</h1>
            <p>This is a placeholder for upcoming features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
