import React from "react";
import "../styles/DashboardCard.css";

const DashboardCard = ({ title, image, onClick }) => {
  return (
    <div className="dashboard-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="card-image-wrap">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-body">
        <div className="card-title">{title}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
