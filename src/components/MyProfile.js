import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/myprofile.css'
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import withAuth from '../utils/withAuth';

const Profile2 = (props) => {
    const { user } = props;
    const location = useLocation();
    // const [users, setUser] = useState({});
    const [profilePic, setProfilePic] = useState('https://picsum.photos/200/300');
    const username = useSelector(state => state.username);
    // const password = useSelector(state => state.password);
    // const email = useSelector(state => state.email);

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="col-md-9">
                <div className="dropdown-myhome">
                    <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                    </a>
                    <p className='username-text'>Welcome {username}</p> {/* Display the username here */}
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="/">My Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="/">Sign out</a></li>
                    </ul>
                </div>
                <div className="profile-container">
                    <div className="profile-pic-container">
                        <img src={profilePic} alt="Profile Picture" className="profile-pic" />
                        <button className="change-pic-btn">Change Picture</button>
                    </div>
                    <div className="profile-info">
                        {/* <h1>User Profile</h1> */}
                        <h2 className='text-body-emphasis3'> Username: {username}</h2>
                        <p className='text-body-emphasis4 lead'>ID: {user.userId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Profile2); 