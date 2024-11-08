import React from "react";
import { FileData } from "./Card";

const FileList: React.FC<{ data: FileData[]; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  return (
    <div className="file-list-overlay">
      <div className="file-list-content">
        <button onClick={onClose} className="file-list-close-button">
          Close
        </button>
        <h2 className="text-lg font-semibold">Uploaded Files</h2>
        <ul className="mt-5">
          {data.map((file) => (
            <li key={file.id}>
              <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>{" "}
              - Uploaded on: {new Date(file.upload_date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
