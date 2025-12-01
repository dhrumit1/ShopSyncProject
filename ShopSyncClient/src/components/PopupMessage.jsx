import React from "react";
import "../styles/PopupMessage.css";

function PopupMessage({ show, type, message, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <p>{message}</p>

        <button onClick={onClose} className={`popup-btn ${type}`}>
          OK
        </button>
      </div>
    </div>
  );
}

export default PopupMessage;
