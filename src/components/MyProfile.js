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
    const [profilePic, setProfilePic] = useState('https://picsum.photos/200/300');
    const username = useSelector(state => state.username);
   
    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await axios.delete('http://localhost:8000/delete-account', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                alert('Account successfully deleted.');
                // Optionally, log out the user and redirect
            } catch (error) {
                alert('Error deleting account.');
            }
        }
    };

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
                <button className="change-pic-btn">Change Picture</button>
                <div className="profile-container">
                    <div className="profile-pic-container">
                        <img src={profilePic} alt="Profile Picture" className="profile-pic" />
                    </div>
                    <div className="profile-info">
                        {/* <h1>User Profile</h1> */}
                        <h2 className='text-body-emphasis3'> Hey {username}</h2>
                        <p className='text-body-emphasis4 lead'>Your Id: {user.userId}</p>
                        <p className='text-body-emphasis5 lead'>Your Id and name will appear here. You can navigate all the options for better understanding of this plattform. Hope you enjoy your stay!</p>
                    </div>
                    <button className='deleteBtn' onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Profile2); 