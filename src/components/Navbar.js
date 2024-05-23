import React, { useEffect, useState, useRef } from 'react';
import logo from '../assets/blue-logo.png';
import '../styles/Navbar.css';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState('home');
    const underlineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('section[id]');
            const navHeight = document.querySelector('.navbar').offsetHeight;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - navHeight;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveItem(section.getAttribute('id'));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const activeElement = document.querySelector('.nav-item.active');
        if (activeElement) {
            underlineRef.current.style.width = `${activeElement.offsetWidth}px`;
            underlineRef.current.style.transform = `translateX(${activeElement.offsetLeft}px)`;
        }
    }, [activeItem]);

    const handleClick = (item) => {
        setActiveItem(item);
        const section = document.getElementById(item);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="bgNav-color navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <a className="text-heading navbar-brand fw-bold" href="#home">
                    <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                    MindMate
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${activeItem === 'home' ? 'active' : ''}`}>
                            <a className="text-heading1 nav-link" href="#home" onClick={() => handleClick('home')}>Home</a>
                        </li>
                        <li className={`nav-item ${activeItem === 'about' ? 'active' : ''}`}>
                            <a className="text-heading1 nav-link" href="#about" onClick={() => handleClick('about')}>About</a>
                        </li>
                        <li className={`nav-item ${activeItem === 'services' ? 'active' : ''}`}>
                            <a className="text-heading1 nav-link" href="#services" onClick={() => handleClick('services')}>Services</a>
                        </li>
                        <li className={`nav-item ${activeItem === 'contact' ? 'active' : ''}`}>
                            <a className="text-heading1 nav-link" href="#contact" onClick={() => handleClick('contact')}>Contact</a>
                        </li>
                        <li className={`nav-item ${activeItem === 'team' ? 'active' : ''}`}>
                            <a className="text-heading1 nav-link" href="#team" onClick={() => handleClick('team')}>Team</a>
                        </li>
                    </ul>
                    <div className="underline" ref={underlineRef}></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;










// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/blue-logo.png';

// const Navbar = () => {
//     return (
//         <nav className="bgNav-color navbar navbar-expand-lg fixed-top">
//             <div className="container-fluid">
//                 <Link className="text-heading navbar-brand fw-bold" to="/">
//                     <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
//                     MindMate
//                 </Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <Link className="text-heading nav-link" to="#home">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <a className="text-heading nav-link" href="#about">About</a>
//                         </li>
//                         <li className="item-margin nav-item">
//                             <a className="text-heading nav-link" href="#services">Services</a>
//                         </li>
//                         <li className="item-margin nav-item">
//                             <a className="text-heading nav-link" href="#contact">Contact</a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
