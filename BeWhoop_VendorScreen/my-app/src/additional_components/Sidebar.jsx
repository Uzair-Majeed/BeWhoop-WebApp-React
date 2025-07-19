import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import logo from '../assets/BeWhoopLogo.png';
import { FaEdit } from "react-icons/fa";
import {
  FaMessage,
  FaRegUser,
  FaGears,
  FaUnlock,
} from 'react-icons/fa6'; 
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path) => currentPath === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const loadingToast = toast.loading('Logging out...');

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // optional
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
      toast.success('Logged out successfully.');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Logout failed.');
    } finally {
      toast.dismiss(loadingToast);
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>

      <div className="nav-links">
        <ul>

          <li className={`nav-item ${isActive('/EditPortfolio') || isActive('/EditProfile') || isActive('/EditServices') ? 'active' : ''}`} onClick={() => navigate('/EditProfile')}>
            <FaEdit className="nav-icon" />
            <a>Edit Profile</a>
          </li>

          <li className={`nav-item ${isActive('/Messages') ? 'active' : ''}`} onClick={() => navigate('/Messages')}>
            <FaMessage className="nav-icon" />
            <a>Messages</a>
          </li>

          <hr className="sidebar-divider" />

          <li className={`nav-item ${isActive('/MyProfile') ? 'active' : ''}`} onClick={() => navigate('/MyProfile')}>
            <FaRegUser className="nav-icon" />
            <a>My Profile</a>
          </li>

          <li className={`nav-item ${isActive('/Settings') ? 'active' : ''}`} onClick={() => navigate('/Settings')}>
            <FaGears className="nav-icon" />
            <a>Settings</a>
          </li>

          <li
            className={`nav-item ${isLoggingOut ? 'disabled' : ''}`}
            onClick={isLoggingOut ? null : handleLogout}
            style={{ cursor: isLoggingOut ? 'not-allowed' : 'pointer', opacity: isLoggingOut ? 0.5 : 1 }}
          >
            <FaUnlock className="nav-icon" />
            <a>{isLoggingOut ? 'Logging out...' : 'Logout'}</a>
          </li>
          
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
