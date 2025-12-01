import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="top-navbar">
        <div className="nav-left">
          <h2 className="app-title">ShopSync</h2>
        </div>

        {/* Desktop Menu */}
        <div className="nav-right desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">Products</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
      </div>
    </>
  );
};

export default Navbar;
