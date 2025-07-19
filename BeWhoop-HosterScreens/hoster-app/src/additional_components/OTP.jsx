import './OTP.css'
import { useNavigate } from 'react-router-dom';
function OTP({ onClose }){

  const navigate = useNavigate();
    return(<div className="otp-overlay">
            <div className="otp-modal">
                <h2>Please enter OTP password to verify your account </h2>
                <p>A one-Time Password sent to your Email</p>
                <input className="otp-input" placeholder="&bull;  &bull;  &bull;  &bull;  &bull;  &bull;  &bull;  &bull;  &bull;  &bull;  " type="password"/>
                <button className="otp-submit" onClick={() => {
                    navigate('/VendorProfile');

                }}>Validate</button>
            </div>
           </div>
    );
}

export default OTP;