import React from "react";
import "./Styles/Footer.css";
export default function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Indian<span>Rasoi</span>
        </h3>

        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">About</a>

          <a href="#">Faq</a>

          <a href="#">Contact</a>
        </p>

        <p className="footer-company-name">India Rasoi © 2021</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <a href="https://goo.gl/maps/yJnXr2ojSoFuNHm89">
              {" "}
              <span>Park Alle 100</span> 8000, Århus
            </a>
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>
            <a href="tel:4512345678">+45 12345678</a>
          </p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">indianrasoi@company.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>Opening Hours</span>
          Week Days: 11:30 to 19:00
          <br />
          Week End: 11:30 to 21:00
        </p>

        <div className="footer-icons">
          <a href="https://www.facebook.com">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://twitter.com">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://linkedin.com">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://github.com">
            <i className="fa fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
