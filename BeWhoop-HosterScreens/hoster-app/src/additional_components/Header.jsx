import notificationIcon from '../assets/Notifications.png';
import flag from '../assets/Flag.png';
import defaultImage from '../assets/UploadPic.png';
import './Header.css';
import { useContext } from 'react';
import { HosterContext } from '../contexts/HosterContext.jsx';

function Header() {
  const { hosterData } = useContext(HosterContext);

  return (
    <header className="header">
      <div className="header-left">
        <input
          type="text"
          className="search-input"
          placeholder="Q   Search..."
        />
      </div>

      <div className="header-right">

        {/*
        <img src={notificationIcon} alt="Notifications" className="header-icon" />
        <div className="language-selector">
          <img src={flag} alt="Flag" className="flag-icon" />
          <span>English</span>
        </div>*/}

        <div className="user-info">
          <img
            src={ defaultImage}
            alt="User"
            className="user-photo"
          />
          <span className="user-name">{hosterData.firstName || 'John'} {hosterData.lastName || 'Doe'}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
