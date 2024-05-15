// HomePage.js
import React from 'react'
import ServicesSection from '../components/Services'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactUsSection from './ContactUsSection';
import logo from '../assets/blue-logo.png';
import girl from '../assets/yoga-girl-white.png';
import '../styles/Homepage.css';

const HomePage = ({ setLoginVisible, setSignUpVisible }) => {
    return (
        <>
            <Navbar />
            <div id="home" className="container my-5">
                <div className="bg-image row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <div className="d-flex align-items-center mb-3">
                            {/* <!-- <img src="./M-logo.png" alt="Logo" className="logo"> --> */}
                            <img src={logo} alt="Logo" className="logo" />
                            <h1 className="display-4 fw-bold lh-1 text-body-emphasis1">MindMate</h1>
                        </div>
                        <p className="h4 fw text-body-emphasis1 lh-1 mb-3">Embracing growth, one step at a time.</p>
                        <p className="text-body-emphasis1 lead">Empowering minds, transforming lives. MindMate is your partner in mental wellness, fostering resilience and flourishing communities through compassion and innovation.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <Link to="/login" className="btn btn-custom btn-lg px-4 me-sm-3 fw-bold">Login</Link>
                            <Link to="/signup" className="btn btn-custom btn-lg px-4 me-sm-3 fw-bold">Sign Up</Link>
                        </div>
                    </div>
                    {/* <!-- <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg"> --> */}
                    <img className="simple-side-image" src={girl} alt="" width="760" height="400" />
                    {/* <!-- </div> --> */}
                </div>
            </div>

            {/* About section */}
            <section id="about" className="section">
                <div className="container">
                    <h2 className="about-heading pb-2">About</h2>
                    <p className='para-text lead'>Welcome to MindMate, your trusted partner in mental health and well-being. At MindMate, we understand the importance of mental wellness in living a fulfilling life. Our mission is to provide comprehensive and compassionate care to individuals seeking support for their mental health concerns. Whether you're facing challenges like anxiety, depression, stress, or simply need guidance in navigating life's complexities, our team of experienced therapists, counselors, and psychiatrists are here to help. We offer a range of services including therapy sessions tailored to your unique needs, online assessments to assess your mental health status, and expert psychiatric consultations for evaluation and medication management. Our goal is to empower you on your journey to mental wellness, providing you with the tools, support, and resources you need to thrive. Take the first step towards a healthier mind with MindMate.</p>
                </div>
            </section>
            <ServicesSection />

            {/* Contact section */}
            <ContactUsSection />

            {/* Footer section */}
            <Footer />

        </>
    );
};
export default HomePage; 