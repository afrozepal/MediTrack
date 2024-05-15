// Footer.js
import React from 'react';
import logo from '../assets/black-logo.png';

const Footer = () => {
    return (
        <div class="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Mindmate, Inc</p>

                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img src={logo} alt="Bootstrap" width="40" height="40" />
                </a>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><a href="#home" className="nav-link px-2 text-body-secondary">Home</a></li>
                    <li className="nav-item"><a href="#about" className="nav-link px-2 text-body-secondary">About</a></li>
                    <li className="nav-item"><a href="#services" className="nav-link px-2 text-body-secondary">Services</a></li>
                    <li className="nav-item"><a href="#contact" className="nav-link px-2 text-body-secondary">Contact</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Footer;
