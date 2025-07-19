import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';  // ✅ Import toast
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/VendorProfile.css';
import bg from '../assets/bg-pic.png';
import defaultImage from '../assets/UploadPic.png';

function VendorProfile() {
  const [profilePreview, setProfilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { vendorData, setVendorData } = useContext(VendorContext);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
      setVendorData((prev) => ({
        ...prev,
        profileImageFile: file,
        profileImage: previewUrl,
      }));
    }
  };

  const handleNext = () => {
    const description = document.querySelector('.vp-description-input').value.trim();

    if (!vendorData.profileImageFile) {
      toast.error('Please upload a profile picture.');
      return;
    }

    if (!description) {
      toast.error('Please enter a short description about your services.');
      return;
    }

    setVendorData((prevData) => ({
      ...prevData,
      description,
    }));

    toast.success('Profile details saved!');
    navigate('/SettingUp');
  };

  return (
    <div className="vp-container">
      <div className="vp-left" style={{ backgroundImage: `url(${bg})` }}>
        <div className="vp-text-group">
          <h1>Get A Vendor Profile</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="vp-info">
        <h1>Let's set things up for you.</h1>
        <p>Share your vision, and we'll help make it real.</p>

        <label className="vp-label1">Add Profile Photo</label>
        <div
          className="vp-upload"
          onClick={handleUploadClick}
          style={{ backgroundImage: `url(${profilePreview || defaultImage})` }}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <label className="vp-label2">Add Description</label>
        <textarea className="vp-description-input" placeholder="Write here..." />

        <button className="vp-next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default VendorProfile;
