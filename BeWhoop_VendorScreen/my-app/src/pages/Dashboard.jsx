import { useContext, useEffect } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/Dashboard.css';
import Header from '../additional_components/Header';
import Sidebar from '../additional_components/Sidebar';
import toast from 'react-hot-toast';

function Dashboard() {
  const { vendorData } = useContext(VendorContext);

  useEffect(() => {
    if (!vendorData?.profileImage) {
      toast.error('No profile image uploaded.');
    }
    if (!vendorData?.fullName && !vendorData?.firstName) {
      toast.error('Incomplete profile: name missing.');
    }
  }, [vendorData]);

  return (
    <div className="dash-container">
      <Sidebar />

      <div className="dash-main">
        <Header />

        <div className="dash-body">
          {vendorData?.profileImage ? (
            <img
              src={vendorData.profileImage}
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ccc'
              }}
            />
          ) : (
            <p>No profile image uploaded.</p>
          )}

          <h2>{vendorData.firstName} {vendorData.lastName}</h2>
          <p>Event Organizer</p>
        </div>

        <div className="dash-info">
          <h3>Price Range : ${vendorData.minPrice || '-'} - ${vendorData.maxPrice || '-'}</h3>
          <hr className="dash-divider" />
          <h3>Location : {vendorData.location || '-'}</h3>
        </div>

        <div className="dash-body">
          <p>{vendorData?.description || 'Description'}!</p>
        </div>

        <div className="dash-portfolio">
          {vendorData.portfolio?.map((file, index) => (
            file.type?.startsWith('image/') ? (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`portfolio-${index}`}
                className="dash-image"
              />
            ) : (
              <div key={index} className="dash-file">
                {file.name}
              </div>
            )
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
