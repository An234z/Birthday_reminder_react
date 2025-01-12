import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Birthday Reminder</div>
      <div className="welcome-container">
        <h1 className="welcome">Welcome to the handy-dandy birthday reminder!</h1>
      </div>
      <div className="nav-links">
        <i className="fa-solid fa-gift"></i>
        <i className="fa-solid fa-gift"></i>
        <i className="fa-solid fa-gift"></i>
      </div>
    </nav>
  );
};

export default Navbar;
