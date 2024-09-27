import React from 'react'
import '../pages/Mainpage/main.css'
import 'remixicon/fonts/remixicon.css'

export default function Footer() {
  return (
    <div>

      <>
        {/* Footer */}
        <div className="footer">
          <div className="container footer-container flex">
            <div className="footer-logo flex"><h2 style={{ color: 'white' }}>DOCTOR ONE</h2></div>
            <div className="footer-nav flex">
              <div>
                <h4 className="footer-head">Know Us</h4>
                <a href="/about">
                  <h4>About Us</h4>
                </a>
                <a href="">
                  <h4>Contact Us</h4>
                </a>
                <a href="/login">
                  <h4>Health Partner Login</h4>
                </a>
              </div>
              <div>
                <h4 className="footer-head">Our Policies</h4>
                <a href="">
                  <h4>PrivacyPolicy</h4>
                </a>
                <a href="">
                  <h4>Terms and Conditions</h4>
                </a>
              </div>
              <div>
                <h4 className="footer-head">Our Services</h4>
                <a href="/doctor">
                  <h4>Doctor</h4>
                </a>
                <a href="/labs">
                  <h4>Labs</h4>
                </a>
                {/* <a href="/">
            <h4>Pharmacy</h4>
          </a> */}
                <a href="/hospital">
                  <h4>Hospital</h4>
                </a>
              </div>
            </div>
            <div className="footer-social-icon flex">
              <a href="">
                <div className="footer-icon flex">
                  <i className="ri-instagram-line" />
                </div>
              </a>
              <a href="">
                <div className="footer-icon flex">
                  <i className="ri-whatsapp-line" />
                </div>
              </a>
              <a href="">
                <div className="footer-icon flex">
                  <i className="ri-facebook-fill" />
                </div>
              </a>
              <a href="">
                <div className="footer-icon flex">
                  <i className="ri-linkedin-fill" />
                </div>
              </a>
            </div>
          </div>
          <div className="footer-Copyright">
            <h4>Copyright © 2023, Doctor one. All rights reserved.</h4>
            <h4></h4>
          </div>
        </div>
        {/*End Footer */}
      </>



    </div>
  )
}
