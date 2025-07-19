import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HosterProvider } from './contexts/HosterContext'
import './App.css'
import Signup from './pages/Signup'
import HosterSetup from './pages/HosterSetup.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import EventTickets from './pages/EventTickets.jsx'
import BankDetails from './pages/BankDetails.jsx'
import Dashboard from './pages/Dashboard.jsx'
import VendorMarketplace from './pages/VendorMarketplace.jsx'
import Profile from './pages/Profile.jsx'
import Placeholder from './pages/PlaceHolder.jsx'
import VendorProfile from './pages/VendorProfile.jsx'
import ProtectedRoute from './additional_components/ProtectedRoute.jsx'
import EventDetails from './pages/EventDetails.jsx'
import MyEvents from './pages/MyEvents.jsx'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <HosterProvider>
          <Toaster position="top-center" toastOptions={{
    success: {
      style: {
        fontSize: '16px',
        maxWidth: '500px',
        padding: '16px 24px',
      },
    },
    error: {
      style: {
        fontSize: '16px',
        maxWidth: '500px',
        padding: '16px 24px',
        backgroundColor: '#ffefef',
        color: '#d32f2f',
      },
    },
  }}/>
        <Routes>
          {/* Public onboarding routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/settingUp" element={<HosterSetup />} />

          {/* Protected flow routes */}
          <Route
            path="/CreateEvent"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EventTickets"
            element={
              <ProtectedRoute>
                <EventTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/BankDetails"
            element={
              <ProtectedRoute>
                <BankDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Marketplace"
            element={
              <ProtectedRoute>
                <VendorMarketplace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EventDetails"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyEvents"
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Messages"
            element={
              <ProtectedRoute>
                <Placeholder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Settings"
            element={
              <ProtectedRoute>
                <Placeholder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Vendor-Profile"
            element={
              <ProtectedRoute>
                <VendorProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HosterProvider>
    </BrowserRouter>
  )
}

export default App
