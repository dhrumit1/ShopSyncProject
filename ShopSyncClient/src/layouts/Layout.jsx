import React from "react";
import Navbar from "../components/Navbar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="content-area">{children}</div>
    </div>
  );
};

export default Layout;
