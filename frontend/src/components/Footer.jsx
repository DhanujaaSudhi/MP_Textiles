
import React, { useState } from "react";

const Footer = () => {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span
              className="cursor-pointer"
              onClick={toggleMap}
            >
              <i className="ri-map-pin-2-fill"></i>
            </span>
            <span    
              className="cursor-pointer text-blue-500 hover:text-orange-500 hover:underline"
              onClick={toggleMap}
            >
              233A, Behind KVB Bank, Salem Main Road, Komarapalayam-638183
            </span>
          </p>
          <p>
            <a href="mailto:mptextileskpm@gmail.com" className="text-blue-500 hover:text-orange-500 hover:underline">
              <span>
                <i className="ri-mail-fill"></i>
              </span>
              mptextileskpm@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+919842763130" className="text-blue-500 hover:text-orange-500 hover:underline">
              <span>
                <i className="ri-phone-fill"></i>
              </span>
              +91 98427 63130
            </a>
          </p>
          <p>
            <a href="tel:+919842340693" className="text-blue-500 hover:text-orange-500 hover:underline">
              <span>
                <i className="ri-phone-fill"></i>
              </span>
              +91 98423 40693
            </a>
          </p>
        </div>

        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/blogs">Blogs</a>
        </div>

        <div className="footer__col">
          <h4>USEFUL LINK</h4>
          <a href="/categories/tapes">Tapes</a>
          <a href="/categories/ropes">Ropes</a>
        </div>
        <div className="footer__col">
          <h4>FOLLOW US ON</h4>
          <p>
  <a
    href="https://wa.me/9842763130"
    className="text-green-500 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>
      <i className="ri-whatsapp-fill"></i> {/* WhatsApp Icon */}
    </span>
    WhatsApp
  </a>
</p>
          <p>
            <a
              href="https://www.instagram.com/mptextiles_26?igsh=cW9pcGp5b3Rmc3l6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-orange-500 hover:underline"
            >
              <span>
                <i className="ri-instagram-fill"></i>
              </span>
              Instagram
            </a>
          </p>
          <p>
            <a
              href="https://www.facebook.com/share/YtjmwVionEW4wCg6/"
              className="text-blue-500 hover:text-orange-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <i className="ri-facebook-circle-fill"></i>
              </span>
              Facebook
            </a>
          </p>
          <p>
  <a
    href="https://x.com/mptextiles_26?t=al2-QQ1FItFxY5LTIxquwg&s=09"
    className="text-blue-500 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>
      <i className="ri-twitter-fill"></i> {/* Twitter Icon */}
    </span>
    Twitter
  </a>
</p>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright © 2025 by MP Textiles. All rights reserved.
      </div>

      {/* Map Modal */}
      {showMap && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={toggleMap}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.519529752886!2d77.6987619!3d11.442378199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9691973c08ba7%3A0x1d698dcef6980362!2sMP.Textiles!5e0!3m2!1sen!2sin!4v1737265806139!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={toggleMap}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;


