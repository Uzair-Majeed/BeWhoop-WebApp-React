import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';   // ✅ import toast
import '../styles/UploadPortfolio.css';
import Bg from '../assets/UploadPortfolio.png';
import FileUpload from '../additional_components/FileUpload.jsx';
import Trash from '../assets/Trash.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function UpdatePortfolio() {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const { vendorData, setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);  // ✅ Loading state

  const validateFile = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSizeMB = 5;

    if (!validTypes.includes(file.type)) {
      toast.error('Only PNG, JPG, JPEG, or PDF files are allowed.');
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File must be under ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  const handleUploadFront = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setVendorData((prev) => ({
        ...prev,
        cnicFront: file,
      }));
    }
    e.target.value = '';
  };

  const handleUploadBack = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setVendorData((prev) => ({
        ...prev,
        cnicBack: file,
      }));
    }
    e.target.value = '';
  };

  const handleNext = async () => {
    if (!vendorData.portfolio || vendorData.portfolio.length === 0) {
      toast.error('Please upload at least one portfolio file.');
      return;
    }

    if (!vendorData.cnicFront || !vendorData.cnicBack) {
      toast.error('Please upload both front and back of your CNIC.');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Uploading documents...');

    try {
      const formData = new FormData();
      vendorData.portfolio.forEach((file) => formData.append('files', file));
      formData.append('files', vendorData.cnicFront);
      formData.append('files', vendorData.cnicBack);

      const uploadRes = await fetch(`${baseURL}/onboarding/vendor/add-social-proof`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!uploadRes.ok) {
        const errData = await uploadRes.json();
        toast.error('Failed to upload files.');
        toast.dismiss(loadingToast);
        setIsLoading(false);
        
        return;
      }

      toast.success('Files uploaded. Fetching file URLs...');

      const getRes = await fetch(`${baseURL}/onboarding/vendor/social-proofs`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const getJson = await getRes.json();
      if (!getRes.ok || !getJson.urls) {
        toast.error(getJson.error || 'Failed to fetch file URLs.');
        toast.dismiss(loadingToast);
        setIsLoading(false);
        return;
      }

      const urls = getJson.urls;
      setVendorData((prev) => ({
        ...prev,
        portfolio: urls,
      }));

      toast.success('Updating profile...');

      const profileRes = await fetch(`${baseURL}/onboarding/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          updates: { social_proof: urls },
        }),
      });

      if (!profileRes.ok) {
        const profileJson = await profileRes.json();
        toast.error(profileJson.error || 'Failed to update profile.');
        toast.dismiss(loadingToast);
        setIsLoading(false);
        return;
      }

      toast.success('Profile updated successfully!');
      toast.dismiss(loadingToast);
      navigate('/MyProfile');

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
      toast.dismiss(loadingToast);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (size) =>
    size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;

  const getFileType = (type) =>
    type.includes('image') ? type.replace('image/', '') : 'PDF';

  return (
    <div className="update-portfolio-card">
      <div
        className="update-portfolio-left-bg"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="update-portfolio-text-group">
          <h1>Upload Portfolio</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="update-portfolio-info">
        <label className="update-portfolio-label1">Add Portfolio</label>
        <FileUpload />

        <label className="update-portfolio-label1">Add Your CNIC</label>
        <div className="update-portfolio-cnic-upload">
          <div className="update-portfolio-cnic-buttons">
            <div className="update-portfolio-upload-group">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                ref={frontRef}
                style={{ display: 'none' }}
                onChange={handleUploadFront}
              />
              <button
                className="update-portfolio-upload-button"
                onClick={() => frontRef.current.click()}
              >
                Upload Front
              </button>
            </div>

            <div className="update-portfolio-upload-group">
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .pdf"
                ref={backRef}
                style={{ display: 'none' }}
                onChange={handleUploadBack}
              />
              <button
                className="update-portfolio-upload-button"
                onClick={() => backRef.current.click()}
              >
                Upload Back
              </button>
            </div>
          </div>

          <div className="update-portfolio-cnic-previews">
            {vendorData.cnicFront && (
              <div className="update-portfolio-cnic-info">
                <span>{vendorData.cnicFront.name}</span>
                <div>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {formatFileSize(vendorData.cnicFront.size)}, {getFileType(vendorData.cnicFront.type)}
                  </span>
                </div>
                <img
                  src={Trash}
                  alt="delete"
                  className="update-portfolio-trash-icon"
                  onClick={() =>
                    setVendorData((prev) => ({ ...prev, cnicFront: null }))
                  }
                />
              </div>
            )}
            {vendorData.cnicBack && (
              <div className="update-portfolio-cnic-info">
                <span>{vendorData.cnicBack.name}</span>
                <div>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {formatFileSize(vendorData.cnicBack.size)}, {getFileType(vendorData.cnicBack.type)}
                  </span>
                </div>
                <img
                  src={Trash}
                  alt="delete"
                  className="update-portfolio-trash-icon"
                  onClick={() =>
                    setVendorData((prev) => ({ ...prev, cnicBack: null }))
                  }
                />
              </div>
            )}
          </div>
        </div>

        <button
          className="update-portfolio-next-button"
          onClick={handleNext}
          disabled={isLoading}   // ✅ Disable while uploading
        >
          {isLoading ? 'Processing...' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default UpdatePortfolio;
