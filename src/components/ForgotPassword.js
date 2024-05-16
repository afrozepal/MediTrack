import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../assets/blue-logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/loginstyle.css';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loggedIn, setLoggedIn] = useState(false);
    const [userExists, setUserExists] = useState(false); // New state to track if user exists
    const [forgotPassword, setForgotPassword] = useState(false); // New state for forgot password

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/sig', {
                email: formData.email,
                password: formData.password,
                action: 'login'
            });

            if (response.data === 'exist') {
                alert('Login successful!');
                setLoggedIn(true); // Set loggedIn state to true
            } else if (response.data === 'notexist') {
                alert('User does not exist!');
                setUserExists(false); // Update userExists state
            } else if (response.data === 'invalid') {
                alert('Invalid credentials!');
                setUserExists(true); // Update userExists state
            } else {
                alert('Login failed!');
                setUserExists(true); // Update userExists state
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed!');
        }
    };

    const handleForgotPassword = () => {
        setForgotPassword(true);
    };

    if (loggedIn) {
        return <Link to="/profile" />;
    }

    return (
        <>
            <Navbar />

            <div className="container my-5">
                <div className="bg-image row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <div className="d-flex align-items-center mb-3">
                            <img src={logo1} alt="Logo" className="logo" />
                            <h1 className="display-4 fw-bold lh-1 text-body-emphasis1">MindMate</h1>
                        </div>
                        <p className="h4 fw text-body-emphasis1 lh-1 mb-3">Embracing growth, one step at a time.</p>
                        <p className="text-body-emphasis1 lead">You can reset your password here.</p>
                        {/* <button onClick={handleForgotPassword} className="btn btn-link text-body-emphasis1">Forgot Password?</button> */}
                    </div>
                    <div className="form-side col-md-10 mx-auto col-lg-5">
                        <div className="form-side col-md-10 mx-auto col-lg-5">
                            <form className="bg-color p-4 p-md-5 rounded-3" onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-feild-color form-control"
                                        id="floatingInput"
                                        name="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-feild-color form-control"
                                        id="floatingPassword"
                                        name="password"
                                        placeholder="New Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-feild-color form-control"
                                        id="floatingPassword"
                                        name="password"
                                        placeholder="Confirm Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                {forgotPassword ? (
                                    <Link to="/login" className="btn-custom w-100 btn btn-lg fw-bold">Reset Password</Link>
                                ) : (
                                    <Link to="/" className="btn-custom w-100 btn btn-lg fw-bold" type="submit">Reset Password</Link>
                                )}

                                <hr className="separation-color my-4" />
                                <small className="text-color">By Clicking Reset Password, you will be redirected to login page.</small>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    );
};

export default ForgotPassword;
