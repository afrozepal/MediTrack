// ServicesSection.js
import React from 'react';
import logo from '../assets/blue-logo.png'

const ServicesSection = () => {
    return (
        <section id="services" className="section">
            <div className="container px-4 py-5" id="custom-cards">
                <h2 className="services-heading pb-2">Our Services</h2>

                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    <div className="col">
                        <div className="card1-image card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Therapy Sessions</h3>
                                <p className="lead">Healing Hearts, One Session at a Time: Individual, Couples, Family, and Group Therapy Available.</p>
                                <ul className="d-flex list-unstyled mt-auto">
                                    <li className="me-auto">
                                        <img src={logo} alt="Bootstrap" width="32" height="32" className="rounded-circle border border-black bg-white" />
                                    </li>
                                    <li className="d-flex align-items-center me-3">
                                        <svg className="bi me-2" width="1em" height="1em" viewBox="0 0 16 16">
                                            <use xlinkHref="#geo-fill" />
                                        </svg>

                                        <small>Pakistan</small>

                                    </li>
                                    {/*
                                    <li className="d-flex align-items-center">
                                        <svg className="bi me-2" width="1em" height="1em" viewBox="0 0 16 16">
                                            <use xlinkHref="#calendar3" />
                                        </svg>
                                        <small>3d</small>
                                    </li>
                                    */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card2-image card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Psychiatric Consultation</h3>
                                <p className="lead">Comprehensive Mental Health Care: Expert Evaluations, Medication Management, and Ongoing Support.</p>
                                <ul className="d-flex list-unstyled mt-auto">
                                    <li className="me-auto">
                                        <img src={logo} alt="Mindmate" width="32" height="32" className="rounded-circle border border-black bg-white" />
                                    </li>
                                    <li className="d-flex align-items-center me-3">
                                        <svg className="bi me-2" width="1em" height="1em" viewBox="0 0 16 16"></svg>

                                        <small>Pakistan</small>

                                    </li>
                                    {/*
                                    <li className="d-flex align-items-center">
                                        <svg className="bi me-2" width="1em" height="1em" viewBox="0 0 16 16"></svg>
                                        <small>4d</small>
                                    </li>
                                    */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card3-image card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg">
                            <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Counseling and Coaching</h3>
                                <p className="lead">Empowering Your Journey: Specialized Counseling and Coaching for Stress, Grief, Career, and Life Goals.</p>
                                <ul className="d-flex list-unstyled mt-auto">
                                    <li className="me-auto">
                                        <img src={logo} alt="Bootstrap" width="32" height="32" className="rounded-circle border border-black bg-white" />
                                    </li>
                                    <li className="d-flex align-items-center me-3">
                                        <svg className="bi me-2" width="1em" height="1em" viewBox="0 0 16 16"></svg>

                                        <small>Pakistan</small>

                                    </li>
                                    {/*
                                    <li className="d-flex align-items-center">
                                        <svg className="bi me-2" width="1em" height="1em" viewBox="0 0 16 16"></svg>
                                        <small>5d</small>
                                    </li>
                                    */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
