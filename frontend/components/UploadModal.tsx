import React, { useState } from "react";

interface UploadModalProps {
  show: boolean;
  onClose: () => void;
  onFilesSelected: (files: File[]) => void;
  onSubmit: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  show,
  onClose,
  onFilesSelected,
  onSubmit,
}) => {
  if (!show) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // Convert FileList to an array
    onFilesSelected(files);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Upload Files</h2>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ marginTop: "20px" }}
        />

        <div className="flex flex-row gap-x-3 mt-[10px]">
          <button onClick={onSubmit} className="ml-auto">
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
