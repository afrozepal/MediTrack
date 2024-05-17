import React, { useState } from 'react';
import { Chart } from 'chart.js/auto';
import '../styles/reportstyle.css';
import Sidebar from './Sidebar';
import searchIcon from '../assets/icons8-search-100.png'

function Reporting() {
    const [ratings, setRatings] = useState(Array(7).fill(null));

    const handleRatingChange = (day, rating) => {
        const newRatings = [...ratings];
        newRatings[day] = rating;
        setRatings(newRatings);
    };

    const generateGraph = () => {
        const ctx = document.getElementById('ratingChart');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Rating',
                    data: ratings,
                    borderColor: 'purple',
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="search-bar d-flex justify-content-center align-items-center">
                            <input type="text" className="form-control search-input" placeholder="Search..." />
                            <button className="btndesign btn btn-outline-secondary" type="button">
                                <img src={searchIcon} alt="Search" width="20" height="20" />
                            </button>
                        </div>
                        <div className="dropdown-rep">
                            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <p>Wecome Username</p>
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="/">My Profile</a></li>
                                <li><a className="dropdown-item" href="/">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        <br />
                        <h2 className='Report-heading'>Reports</h2>
                        <div className='desc-report'>Here You Can See Your Weekly Mood Reports. Day1 starts with Monday onwards.</div>
                        <div className="container py-5">
                            <div className="row">
                                {ratings.map((rating, index) => (
                                    <div className="col-2" key={index}>
                                        <label htmlFor={`rating${index}`} className="form-label">Day {index + 1}:</label>
                                        <input
                                            type="number"
                                            className="reports"
                                            id={`rating${index}`}
                                            min="1"
                                            max="5"
                                            value={rating}
                                            onChange={(e) => handleRatingChange(index, parseInt(e.target.value))}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="btn report-btn mt-4" onClick={generateGraph}>Generate Graph</button>
                            <div className="mt-5">
                                <canvas id="ratingChart" width="300" height="150"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reporting;
