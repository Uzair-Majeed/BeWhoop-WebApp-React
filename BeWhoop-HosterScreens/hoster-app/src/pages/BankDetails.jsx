import { useContext, useState, useEffect } from 'react';
import { HosterContext } from '../contexts/HosterContext.jsx';
import '../styles/BankDetails.css';

function BankDetails({ onValidityChange }) {
  const { hosterData, setHosterData } = useContext(HosterContext);

  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [bankAdded, setBankAdded] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const isValid =
      selectedBank &&
      accountNumber.match(/^\d{12,16}$/) &&
      accountName.match(/^[A-Za-z ]{3,}$/) &&
      agreeToTerms;

    if (onValidityChange) onValidityChange(isValid);
  }, [selectedBank, accountNumber, accountName, agreeToTerms, onValidityChange]);

  const handleSubmit = () => {
    if (!agreeToTerms) {
      alert('Please agree to the terms before continuing.');
      return;
    }

    setHosterData((prev) => ({
      ...prev,
      bankDetails: {
        selectedBank,
        accountNo: accountNumber,
        accountName,
      },
    }));

    setBankAdded(true);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="bank-box">
      <div className="bank-box-header">
        <label className="bank-label2">Bank Details</label>
      </div>

      <select
        className="bank-select-input"
        value={selectedBank}
        onChange={(e) => setSelectedBank(e.target.value)}
        required
        disabled={bankAdded && !editing}
      >
        <option value="">Select Bank</option>
        <option value="HBL">HBL</option>
        <option value="UBL">UBL</option>
        <option value="Meezan">Meezan</option>
      </select>

      <input
        className="bank-simple-input"
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        required
        pattern="\d{12,16}"
        title="Account number must be 12 to 16 digits."
        disabled={bankAdded && !editing}
      />

      <input
        className="bank-simple-input"
        type="text"
        placeholder="Account Name"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        required
        minLength={3}
        pattern="[A-Za-z ]+"
        title="Only letters and spaces allowed."
        disabled={bankAdded && !editing}
      />

      <div className="bank-checkbox-agreement">
        <label>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          <span>
            Admit that it is in review and will be published in 1 month of time
          </span>
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!bankAdded || editing ? (
          <button type="button" className="bank-add-ticket-button" onClick={handleSubmit}>
            {bankAdded ? 'Save Changes' : 'Add Account'}
          </button>
        ) : (
          <button type="button" className="bank-add-ticket-button" onClick={handleEdit}>
            Edit Bank
          </button>
        )}
      </div>
    </div>
  );
}

export default BankDetails;
