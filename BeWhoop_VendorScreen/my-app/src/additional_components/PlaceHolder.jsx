import React from 'react';
import './PlaceHolder.css';
import Sidebar from './Sidebar';
import Header from './Header';

function Placeholder() {
  return (
    <div className="placeholder-container">
      <Sidebar />
      <div className="placeholder-main">
        <Header />
        <div className="placeholder-body">
          <div className="placeholder-box">
            <h1 className="placeholder-title">Placeholder Page</h1>
            <p className="placeholder-text">This is a placeholder for upcoming features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
