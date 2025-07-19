import { useState, useRef, useEffect, useContext } from 'react';
import './FileUpload.css';
import Vector from '../assets/Vector.png';
import Trash from '../assets/Trash.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

function FileUploadSplit() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { vendorData, setVendorData } = useContext(VendorContext);

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'video/mp4',
    'audio/mpeg',
  ];

  // Sync local files with vendorData.portfolio
  useEffect(() => {
    setVendorData((prev) => ({
      ...prev,
      portfolio: files.length > 0 ? [...files] : [],
    }));
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const filtered = droppedFiles.filter(
      (file) =>
        allowedTypes.includes(file.type) &&
        !files.some((f) => f.name === file.name && f.size === file.size)
    );
    setFiles((prev) => [...prev, ...filtered]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filtered = selectedFiles.filter(
      (file) =>
        allowedTypes.includes(file.type) &&
        !files.some((f) => f.name === file.name && f.size === file.size)
    );
    setFiles((prev) => [...prev, ...filtered]);
    e.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const formatFileSize = (size) => {
    return size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  const getFileType = (type) => {
    if (type.includes('image')) return type.replace('image/', '');
    if (type.includes('video')) return 'video';
    if (type.includes('audio')) return 'audio';
    if (type.includes('pdf')) return 'PDF';
    return type;
  };

  return (
    <div className="fileupload-container">
      <div
        className="fileupload-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img src={Vector} alt="Upload" />
        <p>Drag files here<br />or</p>
        <input
          type="file"
          multiple
          accept=".pdf, .jpg, .jpeg, .png, .mp4, .mp3"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <button className="fileupload-button" onClick={handleUploadClick}>
          Upload Files
        </button>
        <p style={{ marginTop: '10px', fontSize: '12px' }}>
          Supported: PDF, JPG, PNG, MP4, MP3
        </p>
      </div>

      <div className="fileupload-list">
        <ul className="fileupload-ul">
          {files.map((file, index) => (
            <li
              key={index}
              className="fileupload-li"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              {file.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              )}
              <div style={{ flexGrow: 1 }}>
                <div>{file.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {formatFileSize(file.size)}, {getFileType(file.type)}
                </div>
              </div>
              <img
                src={Trash}
                alt="Delete"
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const updatedFiles = files.filter((_, i) => i !== index);
                  setFiles(updatedFiles);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FileUploadSplit;
