import './TOS.css';

function TOS({ onClose }) {
  return (
    <div className="tos-overlay">
      <div className="tos-modal">
        <h2>Terms and Conditions</h2>
        <p>Please read the terms below to continue.</p>
        <div className="tos-content">
          <h3>1. Introduction</h3>
          <p>Welcome to our platform. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.</p>

          <h3>2. User Responsibilities</h3>
          <p>You agree to provide accurate information during registration and to use the platform in accordance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account credentials.</p>

          <h3>3. Vendor Services</h3>
          <p>As a vendor, you agree to deliver services as described in your profile and to adhere to agreed-upon terms with clients. Any disputes must be resolved promptly and professionally.</p>

          <h3>4. Payment Terms</h3>
          <p>All payments for services will be processed through our platform. You agree to the applicable fees and payment schedules outlined in your vendor agreement.</p>

          <h3>5. Limitation of Liability</h3>
          <p>Our platform is not liable for any damages arising from the use of our services, including but not limited to direct, indirect, or consequential damages.</p>

          <h3>6. Termination</h3>
          <p>We reserve the right to terminate or suspend your account for violations of these terms, including fraudulent activity or failure to meet service standards.</p>

          <h3>7. Changes to Terms</h3>
          <p>We may update these terms periodically. Continued use of the platform constitutes acceptance of the updated terms.</p>

          <h3>8. Intellectual Property</h3>
          <p>All content on this platform, including but not limited to logos, images, text, and software, is the property of the platform or its licensors and is protected by intellectual property laws.</p>

          <h3>9. Privacy Policy</h3>
          <p>Your privacy is important to us. Please refer to our Privacy Policy for information about how we collect, use, and disclose your personal information.</p>

          <h3>10. Prohibited Activities</h3>
          <p>You agree not to use the platform for any unlawful purpose or to solicit others to perform or participate in any unlawful acts, including distributing viruses or spamming.</p>

          <h3>11. Governing Law</h3>
          <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.</p>

          <h3>12. Dispute Resolution</h3>
          <p>In the event of a dispute, both parties agree to attempt to resolve the issue through informal negotiations. If this fails, the dispute shall be settled through binding arbitration.</p>

          <h3>13. Third-Party Services</h3>
          <p>We may link to third-party services or content. We are not responsible for the availability, accuracy, or policies of third-party sites or services.</p>

          <h3>14. Contact Information</h3>
          <p>If you have any questions about these Terms and Conditions, please contact our support team via the contact details provided on our platform.</p>
        </div>
        <button className="tos-okay" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}

export default TOS;
