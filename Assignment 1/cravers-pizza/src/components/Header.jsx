import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'; // adjust if needed
import '../style.css'; // or scoped css

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" width="300px" /></Link>
        </div>

        <ul className={`nav-links ${menuOpen ? 'show' : ''}`} id="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">View Cart</Link></li>
        </ul>

        <div className="nav-right">
          <Link className="order-btn" to="/menu">Order Now</Link>
          <button id="hamburger" onClick={toggleMenu} aria-label="Toggle menu">&#9776;</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
