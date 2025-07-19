import '../styles/Profile.css';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import defaultImage from '../assets/UploadPic.png';
import { useContext, useRef } from 'react';
import { HosterContext } from '../contexts/HosterContext.jsx';
import toast from 'react-hot-toast'; // ✅ Import toast

function Profile() {
  const { hosterData, setHosterData } = useContext(HosterContext);
  const fileInputRef = useRef(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setHosterData((prev) => ({
          ...prev,
          profilePhoto: file,
        }));
      } else {
        toast.error('Only image files are allowed.'); // ✅ Toast error for invalid file type
      }
    } else {
      toast.error('No file selected.'); // ✅ Toast error for empty selection
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current.click();
  };

  const getProfileImage = () => {
    if (hosterData.profilePhoto) {
      return URL.createObjectURL(hosterData.profilePhoto);
    }
    return defaultImage;
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="scrollable">
          <div className="dashboard-body">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={getProfileImage()}
                alt="Profile"
                className="profile-avatar"
                onClick={triggerPhotoUpload}
                style={{ cursor: 'pointer' }}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handlePhotoSelect}
              />
            </div>
            <h2>{hosterData.fullName}</h2>
            <p>Event Organizer</p>
          </div>

          <div className="dashboard-body">
            <p>
              Reference site about Lorem Ipsum, giving information on its
              origins, as well as a random Lipsum generator. Reference site
              about Lorem Ipsum, giving information on its origins, as well as
              a random Lipsum generator.
            </p>
          </div>

          <div className="portfolio-grid">
            {hosterData.portfolio?.map((file, index) =>
              file.type.startsWith('image/') ? (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`portfolio-${index}`}
                  className="portfolio-image"
                />
              ) : (
                <div key={index} className="file-box">
                  {file.name}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
