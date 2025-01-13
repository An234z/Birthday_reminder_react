import React from "react";
import "./Navbar.css";
import confetti from "canvas-confetti";

const Navbar = () => {
  const throwConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <nav className="navbar">
      <div className="logo">Birthday Reminder</div>
      <div className="welcome-container">
        <h1 className="welcome">Welcome to the handy-dandy birthday reminder!</h1>
      </div>
      <div className="nav-links">
        <i className="fa-solid fa-gift" onClick={throwConfetti}></i>
        <i className="fa-solid fa-gift" onClick={throwConfetti}></i>
        <i className="fa-solid fa-gift" onClick={throwConfetti}></i>
      </div>
    </nav>
  );
};

export default Navbar;
