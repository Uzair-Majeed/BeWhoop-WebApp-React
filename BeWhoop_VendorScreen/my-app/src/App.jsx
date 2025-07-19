import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendorSetup from './pages/VendorSetup.jsx';
import VendorProfile from './pages/VendorProfile.jsx';
import './App.css';
import UploadPortfolio from './pages/UploadPortfolio.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Signup from './pages/Signup.jsx';
import EditProfile from './pages/EditProfile.jsx';
import EditServices from './pages/EditServices.jsx';
import EditPortfolio from './pages/EditPortfolio.jsx';
import Placeholder from './additional_components/PlaceHolder.jsx';
import { VendorProvider } from './contexts/VendorContext.jsx';
import ProtectedRoute from './additional_components/ProtectedRoute.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <VendorProvider>
      <BrowserRouter>
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
          <Route path="/VendorProfile" element={<VendorProfile />} />  
          <Route path="/SettingUp" element={<VendorSetup />} />

          {/* Protected vendor routes */}
          <Route
            path="/UploadPortfolio"
            element={
              <ProtectedRoute>
                <UploadPortfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyProfile"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EditProfile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EditServices"
            element={
              <ProtectedRoute>
                <EditServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EditPortfolio"
            element={
              <ProtectedRoute>
                <EditPortfolio />
              </ProtectedRoute>
            }
          />

          {/* Miscellaneous protected pages */}
          <Route
            path="/Settings"
            element={
              <ProtectedRoute>
                <Placeholder />
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
        </Routes>
      </BrowserRouter>
    </VendorProvider>
  );
}

export default App;
