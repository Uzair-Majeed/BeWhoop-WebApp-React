import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import AnalyticsChart from '../additional_components/AnalyticsChart';
import { dashboardEvents } from '../data/MockData';
import '../styles/Dashboard.css'

function Dashboard() {
  const [search, setSearch] = useState('');

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main-content">
        <Header />
        <div className="dashboard-scrollable">
          <div className="dashboard-wrapper">

            <div className="dashboard-filters">
              <select className="dashboard-select">
                <option>Carnival Festival</option>
              </select>
              <div className="dashboard-filter-actions">
                <button className="dashboard-button">
                  <Filter size={16} /> Today
                </button>
                <select className="dashboard-select">
                  <option>14 Feb 2019</option>
                </select>
                <button className="dashboard-reset">
                  <RefreshCw size={16} /> Reset Filter
                </button>
              </div>
            </div>

            <div className="dashboard-analytics">
              <div className="dashboard-chart">
                <AnalyticsChart />
              </div>
              <div className="dashboard-views">
                <div className="dashboard-metric">
                  <p>Total Event Views</p>
                  <p className="dashboard-views-count">10,000</p>
                </div>
                <div className="dashboard-metric">
                    <p>Click Through Rate</p>
                    <p className="dashboard-views-count">45%</p>
                  </div>
                  <div className="dashboard-metric">
                    <p>Conversion Rate</p>
                    <p className="dashboard-views-count">10%</p>
                  </div>
                  <div className="dashboard-metric">
                    <p>Attendees</p>
                    <p className="dashboard-views-count">10,000</p>
                  </div>
                  <div className="dashboard-metric">
                    <p>Tickets Sold</p>
                    <p className="dashboard-views-count">456</p>
                  </div>
                </div>
            </div>


            <div className="dashboard-events">
              <div className="dashboard-events-header">
                <h3>Events</h3>
                <div className="dashboard-search-wrapper">
                  <Search className="dashboard-search-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Search Events"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="dashboard-search-input"
                  />
                </div>
              </div>

              <table className="dashboard-events-table">
                <thead>
                  <tr>
                    <th>EVENT NAME</th>
                    <th>EVENT LOCATION</th>
                    <th>ATTENDEES</th>
                    <th>DATE</th>
                    <th>ANALYTICS</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardEvents.map((event, i) => (
                    <tr key={i}>
                      <td>{event.name}</td>
                      <td>{event.location}</td>
                      <td>{event.attendees}</td>
                      <td>{event.date}</td>
                      <td>
                        <a href="#" className="dashboard-link">view Analytics</a>
                      </td>
                      <td>
                        <span className={`dashboard-status ${event.status === 'Published' ? 'published' : 'reviewing'}`}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="dashboard-pagination">
                <button>&lt; Prev.</button>
                <button>Next &gt;</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
