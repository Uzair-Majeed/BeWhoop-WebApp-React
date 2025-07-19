import { useState, useRef, useEffect, useContext } from 'react';
import './FileUpload.css';
import Vector from '../assets/Vector.png';
import Trash from '../assets/Trash.png';
import { HosterContext } from '../contexts/HosterContext';

function FileUpload({ onFileChange }) {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { hosterData, setHosterData } = useContext(HosterContext);

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'video/mp4',
    'audio/mpeg'
  ];

  useEffect(() => {
    if (files.length > 0) {
      setHosterData((prev) => {
        const existing = prev.portfolio || [];
        const unique = files.filter(
          (file) => !existing.some((f) => f.name === file.name && f.size === file.size)
        );
        return {
          ...prev,
          portfolio: [...existing, ...unique],
        };
      });
    }
    if (onFileChange) onFileChange(files);
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

  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFileChange) onFileChange(updatedFiles);
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
              
{file.type.startsWith('video/') && (
  <video
    src={URL.createObjectURL(file)}
    style={{
      width: '40px',
      height: '40px',
      objectFit: 'cover',
      borderRadius: '4px'
    }}
    controls={false}
    muted
    preload="metadata"
  />
)}
              {file.name}
              <span style={{ fontSize: '14px', color: '#666' }}>
                {file.size > 1024 * 1024
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB, `
                  : `${(file.size / 1024).toFixed(2)} KB, `}
                {file.type.replace('image/', '')}
              </span>
              <img
                src={Trash}
                alt="trash"
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
                onClick={() => handleDelete(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
