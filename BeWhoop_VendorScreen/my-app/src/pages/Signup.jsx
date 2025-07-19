import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';  // ✅ Import toast
import '../styles/Signup.css';
import signup from '../assets/Signup-bg.png';
import googleIcon from '../assets/Google-Icon.png';
import fbIcon from '../assets/FB-Icon.png';
import whIcon from '../assets/WH-Icon.png';
import { VendorContext } from '../contexts/VendorContext.jsx';
import TOS from '../additional_components/TOS.jsx';

function Signup() {
  const [realPassword, setRealPassword] = useState('');
  const [maskedPassword, setMaskedPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTOS, setShowTOS] = useState(false);
  const { setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    if (input.length > maskedPassword.length) {
      const newChar = input[input.length - 1];
      setRealPassword((prev) => prev + newChar);
    } else {
      setRealPassword((prev) => prev.slice(0, -1));
    }
    setMaskedPassword('●'.repeat(input.length));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;

    if (!termsAccepted) {
      toast.error('Please accept terms and conditions');
      return;
    }

    if (!realPassword || realPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setVendorData((prev) => ({
      ...prev,
      fullName,
      email,
      password: realPassword,
    }));

    toast.success('Signup successful! Redirecting...');
    navigate('/VendorProfile');
  };

  return (
    <div className="signup-vendor-card">
      <div className="signup-left-bg" style={{ backgroundImage: `url(${signup})` }}>
        <div className="signup-text-group">
          <h1>Connect with Hosts</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <form className="signup-vendor-info" onSubmit={handleSubmit}>
        <div className="signup-title-group">
          <h1>Join as a Vendor</h1>
          <p>Create an account to join as a vendor</p>
        </div>

        <label className="signup-label1">Full Name</label>
        <input
          name="fullName"
          className="signup-simple-input"
          placeholder="Example: Henna Adam"
          required
        />

        <label className="signup-label1">Email</label>
        <input
          name="email"
          type="email"
          className="signup-simple-input"
          placeholder="Henna_Adam@gmail.com"
          required
        />

        <div className="signup-password-container">
          <label className="signup-label1">Password</label>
          <label className="signup-label2">Forgot Password?</label>
        </div>

        <input
          type="text"
          className="signup-simple-input"
          placeholder="● ● ● ● ● ●"
          value={maskedPassword}
          onChange={handlePasswordChange}
          minLength={6}
          required
        />

        <label className="signup-label3">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <a
            onClick={() => setShowTOS(true)}
            style={{ textDecoration: 'underline', color: 'black', cursor: 'pointer' }}
          >
            I accept terms and conditions
          </a>
        </label>

        <button type="submit" className="signup-next-button">
          SignUp
        </button>

        <label className="signup-label4" onClick={() => navigate('/')}>
          Already have an account? <span>Signup</span>
          <br />
        </label>

        <div className="signup-social-icons">
          <div className="signup-divider-with-text">
            <span className="signup-line"></span>
            <span className="signup-or-text">or</span>
            <span className="signup-line"></span>
          </div>

          <span className="signup-login-text">Login with Social Apps</span>

          <div className="signup-social-icons-icons">
            <img src={fbIcon} alt="fb-icon" />
            <img src={googleIcon} alt="google-icon" />
            <img src={whIcon} alt="whatsapp-icon" />
          </div>
        </div>
      </form>

      {showTOS && <TOS onClose={() => setShowTOS(false)} />}
    </div>
  );
}

export default Signup;
