import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo1 from '../assets/blue-logo.png';
import '../styles/loginstyle.css';
import { useDispatch } from 'react-redux';
import { setUsername } from '../Redux/action';
import { setPassword } from '../Redux/action';
import { setEmail } from '../Redux/action';

const Login = (props) => {

    const [email, setEmails] = useState('');
    const [password, setPasswords] = useState('');
    const [role, setRole] = useState('client');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login-here', { email, password, role, dispatch, setUsername, setPassword, setEmail });
            const { token } = response.data;
            const decodedToken = JSON.parse(atob(token.split('.')[1]));

            localStorage.setItem('token', token);
            localStorage.setItem('name', decodedToken.name);
            localStorage.setItem('_id', decodedToken.id);
            dispatch(setUsername(response.data.username));
            dispatch(setPassword(response.data.password));
            dispatch(setEmail(response.data.email));
            // console.log('username', response.data.username);

            if (role === 'client') {
                alert('Login succesful!');
                navigate('/myprofile'); // Redirect to client profile page
            } else if (role === 'therapist') {
                navigate('/therapist'); // Redirect to therapist page
            } else {
                console.error('Invalid role received from server');
            }
        } catch (error) {
            console.error('Error logging in', error.response ? error.response.data : error.message);
            alert('Invalid Credentials!');
        }
    };
    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="bg-image-login row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <div className="d-flex align-items-center mb-3">
                            <img src={logo1} alt="Logo" className="logo" />
                            <h1 className="display-4 fw-bold lh-1 text-body-emphasis11">MindMate</h1>
                        </div>
                        <p className="h4 fw text-body-emphasis2 lh-1 mb-3">Welcome back! Please log in to continue.</p>
                    </div>
                    <div className="form-side-login col-md-10 mx-auto col-lg-5">
                        <form className="bg-color p-4 p-md-5 rounded-3" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-field-color-login form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email} onChange={(e) => setEmails(e.target.value)} required />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-field-color-login form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password} onChange={(e) => setPasswords(e.target.value)} required />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    className="form-field-color-login form-control"
                                    id="role"
                                    name="role"
                                    value={role} onChange={(e) => setRole(e.target.value)}>

                                    <option value="client">Client</option>
                                    <option value="therapist">Therapist</option>
                                </select>
                                <label htmlFor="role">Role</label>
                            </div>
                            {/* {loginError && <div className="alert alert-danger">Invalid credentials. Please try again.</div>} */}
                            <button className="btn btn-custom-login w-100 btn-lg" type="submit">Log In</button>
                            <hr className="my-4" />
                            <small className="text-login lead">Don't have an account? <Link to="/signup">Sign up</Link></small>
                            <p className="text-login lead">Forgot your password? <Link to="/forgotpass">Reset it here</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
