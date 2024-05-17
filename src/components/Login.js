import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import logo1 from '../assets/blue-logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/forgotstyle.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const [userExists, setUserExists] = useState(false);

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

            if (response.data.token) {
                // Store JWT token and username in local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);

                alert('Login successful!');
                navigate('/profile'); // Redirect to profile page
            } else if (response.data === 'notexist') {
                alert('User does not exist!');
                setUserExists(false); 
            } else if (response.data === 'invalid') {
                alert('Invalid credentials!');
                setUserExists(true); 
            } else {
                alert('Login failed!');
                setUserExists(true); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed!');
        }
    };

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
                        <p className="text-body-emphasis1 lead">Welcome back! Please log in with your existing account credentials. If you're new here, feel free to sign up for an account to get started.</p>
                        <p className="text-body-emphasis1 lead"><i>Click here if you <Link to="/forgotpass" className='forgot-link'>Forgot Password</Link></i></p>
                    </div>
                    <div className="form-side-login col-md-10 mx-auto col-lg-5">
                        <form className="bg-color-login p-4 p-md-5 rounded-3" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-feild-color-login form-control"
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
                                    className="form-feild-color-login form-control"
                                    id="floatingPassword"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            {userExists && (
                                <Link to='/signup' className="btn-custom w-100 btn btn-lg fw-bold">Sign Up First</Link>
                            )}
                            <button className="btn-custom w-100 btn btn-lg fw-bold" type="submit">Login</button>
                            <hr className="separation-color my-4" />
                            <small className="text-color">By clicking Login, you will go to your account.</small>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export { Login };
