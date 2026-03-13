import React from "react";
import "./Footer.scss";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top Section: Main Content */}
        <div className="footer-top">

          {/* Left Column: Brand & Newsletter */}
          <div className="footer-brand-section">
            <h2 className="footer-brand-name">Sangam Sathi</h2>
            <p className="footer-brand-description">
              A Premium Matrimony Service. Connect with your perfect match within your community with trust and elegance.
            </p>

            <div className="footer-newsletter">
              <h4 className="newsletter-title">Join Our Newsletter</h4>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="footer-input"
                />
                <button className="footer-button">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Links Grid */}
          <div className="footer-links-grid">

            <div className="footer-link-group">
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-list">
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/about")}>About Us</li>
                <li onClick={() => navigate("/service")}>Services</li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-list">
                <li onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h3 className="footer-heading">Contact</h3>
              <ul className="footer-list contact-list">
                <li><span className="accent-text">Email:</span> ornateinteriord@gmail.com</li>
                <li><span className="accent-text">Call:</span> +91 91488 24442</li>
                <li onClick={() => navigate("/contact")} className="contact-link">Contact Support →</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            Copyright © {new Date().getFullYear()} Ornate Pvt Ltd. All rights reserved.
          </div>

          <div className="social-icons">
            <span className="social-icon" onClick={() => handleSocialClick("facebook")} aria-label="Facebook">
              <FaFacebookF />
            </span>
            <span className="social-icon" onClick={() => handleSocialClick("twitter")} aria-label="Twitter">
              <FaTwitter />
            </span>
            <span className="social-icon" onClick={() => handleSocialClick("linkedin")} aria-label="LinkedIn">
              <FaLinkedinIn />
            </span>
            <span className="social-icon" onClick={() => handleSocialClick("youtube")} aria-label="YouTube">
              <FaYoutube />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
