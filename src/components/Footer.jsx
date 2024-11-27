import React from "react";
import "../pages/Mainpage/main.css";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <>
        {/* Footer */}
        <div className="footer">
          <div className="container footer-container flex">
            <div className="footer-logo flex">
              <h2 style={{ color: "white" }}>Dr ONE</h2>
            </div>
            <div className="footer-nav flex">
              <div>
                <h4 className="footer-head">Know Us</h4>
                <Link to="/about">
                  <h4>About Us</h4>
                </Link>

                <h4>Contact Us</h4>

                <Link to="/login">
                  <h4>Health Partner Login</h4>
                </Link>
              </div>
              <div>
                <h4 className="footer-head">Our Policies</h4>

                <h4>PrivacyPolicy</h4>

                <h4>Terms and Conditions</h4>
              </div>
              <div>
                <h4 className="footer-head">Our Services</h4>
                <Link to="/doctor">
                  <h4>Doctor</h4>
                </Link>
                <Link to="/labs">
                  <h4>Labs</h4>
                </Link>
                {/* <Link to="/">
            <h4>Pharmacy</h4>
          </Link> */}
                <Link to="/hospital">
                  <h4>Hospital</h4>
                </Link>
              </div>
            </div>
            <div className="footer-social-icon flex">
              <div className="footer-icon flex">
                <i className="ri-instagram-line" />
              </div>

              <div className="footer-icon flex">
                <i className="ri-whatsapp-line" />
              </div>

              <div className="footer-icon flex">
                <i className="ri-facebook-fill" />
              </div>

              <div className="footer-icon flex">
                <i className="ri-linkedin-fill" />
              </div>
            </div>
          </div>
          <div className="footer-Copyright">
            <h4>Copyright © 2024, Doctor one. All rights reserved.</h4>
          </div>
        </div>
        {/*End Footer */}
      </>
    </div>
  );
}
