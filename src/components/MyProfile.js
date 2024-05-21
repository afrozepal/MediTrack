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
    const password = useSelector(state => state.password);
    const email = useSelector(state => state.email);

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="profile-container">
                <div className="profile-pic-container">
                    <img src={profilePic} alt="Profile Picture" className="profile-pic" />
                    <button className="change-pic-btn">Change Picture</button>
                </div>
                <div className="profile-info">
                    {/* <h1>User Profile</h1> */}
                    <h2>Username: {username}</h2>
                    <p>Email: {email}</p>
                    <p>ID: {user.userId}</p>
                    <p>Password: {password}</p>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Profile2); 