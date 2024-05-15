import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo1 from '../assets/blue-logo.png';
import axios from 'axios'; // Import Axios

import '../styles/signupstyle.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/sig', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                action: 'signup' // Specify the action as signup
            });

            if (response.data === 'success') {
                alert('Sign up successful!');
                // Redirect or do something else on successful signup
            } else if (response.data === 'exist') {
                alert('User already exists!');
            } else {
                alert('Sign up failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sign up failed!');
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
                        <p className="text-body-emphasis1 lead">No account yet? Sign up now to get access to exclusive features and content. If you already have an account, please log in to continue.</p>
                    </div>
                    <div className="form-side col-md-10 mx-auto col-lg-5">
                        <form className="bg-color p-4 p-md-5 rounded-3" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-feild-color form-control"
                                    id="username"
                                    name="username" // Add name attribute
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-feild-color form-control"
                                    id="email"
                                    name="email" // Add name attribute
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-feild-color form-control"
                                    id="password"
                                    name="password" // Add name attribute
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn-custom w-100 btn btn-lg fw-bold" type="submit">SignUp</button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default SignUp;






// // SignUp.js
// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import logo1 from '../assets/blue-logo.png'; // Import the logo image
// import '../styles/signupstyle.css';

// const SignUp = () => {
//     // Implement your sign-up form here
//     return (
//         <>
//             <Navbar />

//             <div className="container my-5">

//                 <div className="bg-image row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
//                     <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
//                         <div className="d-flex align-items-center mb-3">
//                             <img src={logo1} alt="Logo" className="logo" />
//                             <h1 className="display-4 fw-bold lh-1 text-body-emphasis1">MindMate</h1>
//                         </div>
//                         <p className="h4 fw text-body-emphasis1 lh-1 mb-3">Embracing growth, one step at a time.</p>
//                         <p className="text-body-emphasis1 lead">No account yet? Sign up now to get access to exclusive features and content. If you already have an account, please log in to continue.</p>
//                     </div>
//                     <div className="form-side col-md-10 mx-auto col-lg-5">
//                         <form className="bg-color p-4 p-md-5 rounded-3 ">
//                             <div className="form-floating mb-3">
//                                 {/* Text Feilds */}
//                                 <input type="email" className="form-feild-color form-control" id="floatingInput" placeholder="Username" />
//                                 <label for="floatingInput">UserName</label>
//                             </div>
//                             <div className="form-floating mb-3">
//                                 <input type="email" className="form-feild-color form-control" id="floatingInput" placeholder="name@example.com" />
//                                 <label for="floatingInput">Email address</label>
//                             </div>
//                             <div className="form-floating mb-3">
//                                 <input type="password" className="form-feild-color form-control" id="floatingPassword" placeholder="Password" />
//                                 <label for="floatingPassword">Password</label>
//                             </div>
//                             <div className="remember-me-text checkbox mb-3">
//                                 <label>
//                                     <input type="checkbox" value="remember-me" /> Remember me
//                                 </label>
//                             </div>
//                             {/* submit Event here */}
//                             <button className="btn-custom w-100 btn btn-lg fw-bold" type="submit">SignUp</button>
//                             <hr className="separation-color my-4" />
//                             <small className="text-color">By clicking Sign up, you agree to the terms of use.</small>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer section */}
//             <Footer />
//         </>
//     );
// };

// export default SignUp;
