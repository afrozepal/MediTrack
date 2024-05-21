import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo1 from '../assets/blue-logo.png';
import '../styles/signupstyle.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/signup-here', { name, email, password, role });
            if (response.data.message === 'User created successfully') {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error signing up', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="bg-image-sign row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <div className="d-flex align-items-center mb-3">
                            <img src={logo1} alt="Logo" className="logo" />
                            <h1 className="display-4 fw-bold lh-1 text-body-emphasis1">MindMate</h1>
                        </div>
                        <p className="h4 fw text-body-emphasis2 lh-1 mb-3">Embracing growth, one step at a time.</p>
                        <p className="text-body-emphasis2 lead">No account yet? Sign up now to get access to exclusive features and content. If you already have an account, please log in to continue.</p>
                    </div>
                    <div className="form-side col-md-10 mx-auto col-lg-5">
                        <form className="bg-color p-4 p-md-5 rounded-3" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-feild-color-signup form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={name} onChange={(e) => setName(e.target.value)} required
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-feild-color-signup form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-feild-color-signup form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-feild-color form-control"
                                    id="role"
                                    name="role"
                                    value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="client">Client</option>
                                    <option value="therapist">Therapist</option>
                                </select>
                                <label htmlFor="role">Role</label>
                            </div>
                            <button className="btn btn-custom-signup w-100 btn-lg" type="submit">Sign Up</button>
                            <hr className="my-4" />
                            <small className="text-signup lead">By clicking Sign up, you agree to the terms of use.</small>
                            <p className="text-signup lead">Already have an account? <Link to="/login">Log in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignUp;










