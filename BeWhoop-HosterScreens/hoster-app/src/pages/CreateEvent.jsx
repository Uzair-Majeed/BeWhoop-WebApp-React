import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../styles/CreateEvent.css";
import Header from "../additional_components/Header.jsx";
import Sidebar from "../additional_components/Sidebar.jsx";
import FileUpload from "../additional_components/FileUpload.jsx";
import { HosterContext } from "../contexts/HosterContext.jsx";
import bin from "../assets/bin.png";
import edit from "../assets/pencil-write.png";
import ticketLogo from "../assets/ticketLogo.png";

function CreateEvent() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { hosterData, setHosterData } = useContext(HosterContext);

  const [editingField, setEditingField] = useState(null);
  const [ticketed, setTicketed] = useState(false);
  const [isTicketsValid, setIsTicketsValid] = useState(false);
  const [isBankValid, setIsBankValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultTitle = "Add a Title Here *";
  const defaultTagline = "Add a Tagline Here (optional)";
  const defaultDescription = "Add a Description Here (optional)";

  const [eventTitle, setEventTitle] = useState(defaultTitle);
  const [tagline, setTagline] = useState(defaultTagline);
  const [description, setDescription] = useState(defaultDescription);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [customURL, setCustomURL] = useState("");

  const [ticketTier, setTicketTier] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTicketId, setEditTicketId] = useState(null);
  const [tickets, setTickets] = useState([]);

  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [bankAdded, setBankAdded] = useState(false);
  const [editingBank, setEditingBank] = useState(false);

  const uploadedFilesRef = useRef([]);

  useEffect(() => {
    if (Array.isArray(hosterData.tickets)) setTickets(hosterData.tickets);
  }, [hosterData]);

  useEffect(() => {
    const valid =
      selectedBank &&
      /^\d{12,16}$/.test(accountNumber) &&
      /^[A-Za-z ]{3,}$/.test(accountName) &&
      agreeToTerms;
    setIsBankValid(valid);
  }, [selectedBank, accountNumber, accountName, agreeToTerms]);

  useEffect(() => {
    if (ticketed && tickets.length > 0 && isBankValid) {
      setIsTicketsValid(true);
    } else {
      setIsTicketsValid(false);
    }
  }, [tickets, ticketed, isBankValid]);

  const handleBlur = (field) => {
    setEditingField(null);
    if (field === "title" && eventTitle.trim() === "")
      setEventTitle(defaultTitle);
    if (field === "tagline" && tagline.trim() === "")
      setTagline(defaultTagline);
    if (field === "description" && description.trim() === "")
      setDescription(defaultDescription);
  };

  const renderEditableField = (field, value, setValue) => {
    const isTitle = field === "title";
    const isTextarea = field === "description";
    const showAsterisk = value === defaultTitle;
    const showOptional =
      value === defaultTagline || value === defaultDescription;

    if (editingField === field) {
      const InputComponent = isTextarea ? "textarea" : "input";
      return (
        <InputComponent
          className="create-title-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => handleBlur(field)}
          autoFocus
          required={isTitle}
        />
      );
    }

    return (
      <h2
        className="create-editable-title"
        onClick={() => setEditingField(field)}
      >
        {value.split(/[*\(]/)[0].trim()}
        {showAsterisk && isTitle && (
          <span style={{ color: "#BE0000" }}> *</span>
        )}
        {showOptional && !isTitle && (
          <span style={{ color: "#BE0000" }}> (optional)</span>
        )}
      </h2>
    );
  };

  const handleEditTicket = (ticket) => {
    setEditMode(true);
    setEditTicketId(ticket.id);
    setTicketTier(ticket.tier);
    setTicketPrice(ticket.price);
    setTicketQuantity(ticket.quantity);
  };

  const handleDeleteTicket = (ticketId) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updatedTickets);
    setHosterData((prev) => ({ ...prev, tickets: updatedTickets }));
    toast.success("Ticket deleted successfully");
  };

  const handleTicketSubmit = (e) => {
    if (!ticketTier.trim() || !ticketQuantity.trim() || !ticketPrice.trim()) {
      toast.error("Please fill in all ticket fields");
      return;
    }

    const updatedTickets = editMode
      ? tickets.map((ticket) =>
          ticket.id === editTicketId
            ? {
                ...ticket,
                tier: ticketTier,
                price: ticketPrice,
                quantity: ticketQuantity,
              }
            : ticket
        )
      : [
          ...tickets,
          {
            id: Date.now(),
            tier: ticketTier,
            price: ticketPrice,
            quantity: ticketQuantity,
          },
        ];

    setTickets(updatedTickets);
    setHosterData((prev) => ({ ...prev, tickets: updatedTickets }));
    setTicketTier("");
    setTicketPrice("");
    setTicketQuantity("");
    setEditMode(false);
    setEditTicketId(null);
    toast.success(editMode ? "Ticket updated successfully" : "Ticket added successfully");
  };

  const handleBankSubmit = () => {
  if (
    !selectedBank ||
    !/^\d{12,16}$/.test(accountNumber) ||
    !/^[A-Za-z ]{3,}$/.test(accountName) ||
    !agreeToTerms
  ) {
    toast.error("Please fill in all bank details correctly");
    return;
  }

  const updatedBankDetails = {
    selectedBank,
    accountNo: accountNumber,
    accountName,
  };

  setHosterData((prev) => ({ ...prev, bankDetails: updatedBankDetails }));
  setBankAdded(true);
  setEditingBank(false);
  toast.success(bankAdded ? "Bank details updated" : "Bank details added");
};


  const handleBasicSave = () => {
    if (!eventTitle || eventTitle === defaultTitle || !eventTitle.trim()) {
    toast.error("Please enter an event title");
    return;
  }
  if (uploadedFilesRef.current.length === 0) {
    toast.error("Please upload at least one image or video");
    return;
  }
  
    const form1 = document.querySelector("#form1");
    if (!form1?.checkValidity()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setHosterData((prev) => ({
      ...prev,
      eventTitle,
      tagline,
      description,
      location,
      startTime,
      endTime,
      customURL,
      uploadedFiles: uploadedFilesRef.current,
    }));
    setIsSubmitted(true);
    toast.success("Event details saved successfully");
  };

  const handleNext = async () => {
    const form1 = document.querySelector("#form1");
    if (!form1?.checkValidity()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (ticketed) {

      if (tickets.length === 0) {
        toast.error("Please add at least one ticket");
        return;
      }
      if (!bankAdded) {
        toast.error("Please save bank details");
        return;
      }
    }

    const eventData = {
      title: eventTitle !== defaultTitle ? eventTitle : "",
      description: description !== defaultDescription ? description : "",
      media: hosterData.portfolio.length > 0 ? hosterData.portfolio[0] : (uploadedFilesRef.current.length > 0 ? uploadedFilesRef.current[0] : ""),
      location: location,
      event_type: hosterData.eventFrequency || "public",
      categories: hosterData.eventTypes || [],
    };

    const toastId = toast.loading("Creating event...");
    try {
      const response = await fetch(`${baseURL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const result = await response.json();
      console.log("Event created:", result);
      toast.success("Event created successfully", { id: toastId });
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="create-dashboard-container">
      <Sidebar />
      <div className="create-main-content">
        <Header />
        <div className="create-edit-profile-scrollable">
          <form
            id="form1"
            className="create-form-wrapper"
            onSubmit={(e) => {
              e.preventDefault();
              handleBasicSave();
            }}
          >
            <label className="create-label1">Create New Event</label>

            <div className="create-box">
              <div className="create-title-section">
                {renderEditableField("title", eventTitle, setEventTitle)}
                {renderEditableField("tagline", tagline, setTagline)}
                {renderEditableField("description", description, setDescription)}
              </div>
            </div>

            <div className="create-box-middle">
              <label className="create-label2">
                Add Media (Images/Video){" "}
                <span style={{ color: "#BE0000" }}>*</span>
              </label>
              <FileUpload
                onFileChange={(files) => (uploadedFilesRef.current = files)}
                required
              />
            </div>

            <div className="create-box">
              <label className="create-label2">
                Location/Venue <span style={{ color: "#BE0000" }}>*</span>
              </label>
              <input
                type="text"
                className="create-input"
                placeholder="Enter your Location/Venue"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setIsSubmitted(false);
                }}
                required
              />
            </div>

            <div className="create-box">
              <label className="create-label2">
                Duration <span style={{ color: "#BE0000" }}>*</span>
              </label>
              <div className="create-time-row">
                <div className="create-time-col">
                  <label className="create-label2">Start Time</label>
                  <input
                    type="datetime-local"
                    className="create-input"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      setIsSubmitted(false);
                    }}
                    required
                  />
                </div>
                <div className="create-time-col">
                  <label className="create-label2">End Time</label>
                  <input
                    type="datetime-local"
                    className="create-input"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                      setIsSubmitted(false);
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="create-box">
              <label className="create-label2">
                Custom URL <span style={{ color: "#BE0000" }}>*</span>
              </label>
              <input
                type="text"
                className="create-input"
                placeholder="e.g. bewhoop.com/events/my-event-name"
                value={customURL}
                onChange={(e) => {
                  setCustomURL(e.target.value);
                  setIsSubmitted(false);
                }}
                required
                pattern="^https?://[a-zA-Z0-9.-]+/events/[a-zA-Z0-9-]+"
              />
            </div>

            <div className="create-save-button-container">
              <button
                type="submit"
                className="create-save-button"
                style={{ backgroundColor: isSubmitted ? "#ccc" : "#BE0000" }}
              >
                Save Changes
              </button>
            </div>

            <div className="create-box">
              <div className="create-box-header">
                <label className="create-label2">
                  Ticketed? <span style={{ color: "#BE0000" }}>(optional)</span>
                </label>
                <label className="create-toggle-switch">
                  <input
                    type="checkbox"
                    onChange={() => setTicketed(!ticketed)}
                  />
                  <span className="create-slider create-round"></span>
                </label>
              </div>
            </div>
          </form>
          {ticketed && (
            <>
              <form
                id="form2"
                className="create-form-wrapper"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTicketSubmit();
                }}
              >
                <div className="tickets-box">
                  <label className="tickets-label2">Event Tickets</label>

                  <div className="tickets-ticket-form">
                    <div className="tickets-ticket-fields">
                      <input
                        className="tickets-simple-input"
                        placeholder="Ticket Tier"
                        value={ticketTier}
                        onChange={(e) => setTicketTier(e.target.value)}
                        required
                      />
                      <input
                        className="tickets-simple-input"
                        placeholder="Quantity"
                        value={ticketQuantity}
                        onChange={(e) => setTicketQuantity(e.target.value)}
                        pattern="\d+"
                        required
                      />
                      <input
                        className="tickets-simple-input"
                        placeholder="Price Per Ticket"
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        pattern="\d+(\.\d{1,2})?"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="tickets-add-ticket-button"
                    >
                      {editMode ? "Update Ticket" : "Add Ticket"}
                    </button>
                  </div>

                  {tickets.map((ticket) => (
                    <div className="tickets-ticket-card" key={ticket.id}>
                      <img
                        src={ticketLogo}
                        alt="ticket"
                        className="tickets-ticket-img"
                      />
                      <span className="tickets-ticket-detail">
                        {ticket.tier}
                      </span>
                      <span className="tickets-ticket-detail">
                        Rs {ticket.price}
                      </span>
                      <span className="tickets-ticket-detail">
                        {ticket.quantity} pcs
                      </span>
                      <div className="tickets-ticket-actions">
                        <img
                          src={edit}
                          alt="edit"
                          className="tickets-ticket-icon"
                          onClick={() => handleEditTicket(ticket)}
                        />
                        <img
                          src={bin}
                          alt="delete"
                          className="tickets-ticket-icon"
                          onClick={() => handleDeleteTicket(ticket.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </form>

             <form
        id="form3"
        className="create-form-wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          handleBankSubmit();
        }}
      >
        <div className="bank-box">
          <label className="bank-label2">Bank Details</label>

          <select
            className="bank-select-input"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            disabled={bankAdded && !editingBank}
            required
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
            disabled={bankAdded && !editingBank}
            pattern="\d{12,16}"
            required
          />

          <input
            className="bank-simple-input"
            type="text"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            disabled={bankAdded && !editingBank}
            pattern="[A-Za-z ]{3,}"
            required
          />

          <div className="bank-checkbox-agreement">
            <label>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                disabled={bankAdded && !editingBank}
                required
              />
              <span>
                Admit that it is in review and will be published in 1 month of time
              </span>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
  <button
    type="button"
    className="bank-add-ticket-button"
    onClick={() => {
      if (editingBank) {
        handleBankSubmit();  // Save when already editing
      } else {
        setEditingBank(true);  // Enable editing when locked
      }
    }}
  >
    {editingBank ? "Save Changes" : bankAdded ? "Edit Bank" : "Add Account"}
  </button>
</div>

        </div>
      </form>
            </>
          )}

          <div className="create-save-button-container2">
            <button
              type="button"
              className="create-save-button2"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;