import React from 'react';
// import { Link } from 'react-router-dom';
import searchIcon from '../assets/icons8-search-100.png';
import '../styles/Profile.css'
const Header = () => {
    return (
        <div className="search-bar d-flex justify-content-center align-items-center">
            <input type="text" className="form-control search-input" placeholder="Search..." />
            <button className="btndesign btn btn-outline-secondary" type="button">
                <img src={searchIcon} alt="Search" width="20" height="20" />
            </button>

            <div className="dropdown">
                <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="/">My Profile</a></li>
                    <li><a className="dropdown-item" href="/">Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="/">Sign out</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
