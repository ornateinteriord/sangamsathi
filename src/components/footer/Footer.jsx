import React from "react";
import "./Footer.scss";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h2 className="footer-heading">Girija Kalyana</h2>
            <p className="footer-text">
              A Superior Matrimony Service. Register and find your special
              someone matches within your community.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">About Company</h3>
            <ul className="footer-list">
              <li>About Us</li>
              <li>Promoter</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cancellation Policy</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-text">Email: contactusgirijakalyana@gmail.com</p>
            <p className="footer-text">Email: enquirygirijakalyana@gmail.com</p>
            <p className="footer-text">Call Us: 9148824442</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Subscribe to Newsletter</h3>
            <input
              type="email"
              placeholder="Enter your email address"
              className="footer-input"
            />
            <button className="footer-button">Subscribe</button>
          </div>
        </div>

        <div className="footer-social">
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
              <FaLinkedinIn />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
              <FaYoutube />
            </a>
          </div>
        </div>
        
        <div className="footer-copyright">
          Copyright © {new Date().getFullYear()} Ornate Pvt Ltd.
        </div>
      </div>
    </footer>
  );
}

export default Footer;