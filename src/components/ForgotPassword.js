import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../assets/blue-logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/forgotstyle.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confiermPass, setconfiermPass] = useState('');
    const [role, setRole] = useState('client');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/forgot-password', { email, newPassword, role });
            if (response.data.message === 'Password reset successful') {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error resetting password', error);
        }
    };
    return (
        <>
            <Navbar />

            <div className="container my-5">
                <div className="bg-image-forgot row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <div className="d-flex align-items-center mb-3">
                            <img src={logo1} alt="Logo" className="logo" />
                            <h1 className="display-4 fw-bold lh-1 text-body-emphasis1">MindMate</h1>
                        </div>
                        <p className="h4 fw text-body-emphasis2 lh-1 mb-3">Embracing growth, one step at a time.</p>
                        <p className="text-body-emphasis2 lead">You can reset your password here.</p>
                    </div>
                    <div className="form-side col-md-10 mx-auto col-lg-5">
                        <div className="form-side-forgot col-md-10 mx-auto col-lg-5">
                            <form className="bg-color-forgot p-4 p-md-5 rounded-3" onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-feild-color-forgot form-control"
                                        id="floatingInput"
                                        name="email"
                                        placeholder="name@example.com"
                                        value={email} onChange={(e) => setEmail(e.target.value)} required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-feild-color-forgot form-control"
                                        id="floatingPassword"
                                        name="password"
                                        placeholder="New Password"
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                                    <label htmlFor="floatingPassword">New Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-feild-color-forgot form-control"
                                        id="floatingConfirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={confiermPass} onChange={(e) => setconfiermPass(e.target.value)} required />

                                    <label htmlFor="floatingConfirmPassword">Confirm New Password</label>
                                </div>
                                <Link to='/login' type="submit" className="btn-custom-forgot w-100 btn btn-lg fw-bold">Reset Password</Link>

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
