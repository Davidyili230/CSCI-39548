import React from 'react';

import facebook from '../assets/img/facebook.png';
import instagram from '../assets/img/instagram.png';
import email from '../assets/img/email.png';
import phone from '../assets/img/phone.png';


const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><img src={facebook} alt="Facebook" width="300px" /></a>
            <a href="#" aria-label="Instagram"><img src={instagram} alt="Instagram" width="300px" /></a>
            <a href="#" aria-label="Email"><img src={email} alt="Email" width="300px" /></a>
            <a href="#" aria-label="Phone"><img src={phone} alt="Phone" width="300px" /></a>
          </div>
        </div>
        <div className="footer-right">
          <h4>Business Hours</h4>
          <ul>
            <li>Mon–Fri: 10am – 10pm</li>
            <li>Sat: 12pm – 11pm</li>
            <li>Sun: Closed</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
