import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import '../styles/reportstyle.css';
import Sidebar from './Sidebar';
import searchIcon from '../assets/icons8-search-100.png';
import withAuth from '../utils/withAuth';
import { useSelector } from 'react-redux';

function Reporting() {
    const [ratings, setRatings] = useState(Array(7).fill(null));
    const [previousRatings, setPreviousRatings] = useState([]);
    const [week, setWeek] = useState('');
    const [previousWeek, setPreviousWeek] = useState('');
    const token = localStorage.getItem('token');
    // const userId = localStorage.getItem('username');
    const username = useSelector(state => state.username);

    useEffect(() => {
        const currentWeek = getCurrentWeek();
        setWeek(currentWeek);
        setPreviousWeek(getPreviousWeek(currentWeek));
        fetchRatings(currentWeek);
        fetchRatings(getPreviousWeek(currentWeek), true);
    }, []);

    const getCurrentWeek = () => {
        const date = new Date();
        const year = date.getFullYear();
        const week = Math.ceil((((date - new Date(year, 0, 1)) / 86400000) + new Date(year, 0, 1).getDay() + 1) / 7);
        return `${year}-${week}`;
    };

    const getPreviousWeek = (currentWeek) => {
        const [year, week] = currentWeek.split('-').map(Number);
        let newWeek = week - 1;
        let newYear = year;
        if (newWeek <= 0) {
            newWeek = 52;
            newYear = year - 1;
        }
        return `${newYear}-${newWeek}`;
    };

    const fetchRatings = async (week, isPrevious = false) => {
        try {
            const response = await axios.get('http://localhost:8000/ratings', {
                params: { week },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data && response.data.ratings) {
                if (isPrevious) {
                    setPreviousRatings(response.data.ratings);
                } else {
                    setRatings(response.data.ratings);
                }
            }
        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
    };

    const handleRatingChange = (day, rating) => {
        const newRatings = [...ratings];
        newRatings[day] = rating;
        setRatings(newRatings);
    };

    const saveRatings = async () => {
        try {
            await axios.post('http://localhost:8000/ratings', { week, ratings }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Ratings saved successfully');
        } catch (error) {
            console.error('Error saving ratings:', error);
        }
    };

    const generateGraph = (ratings, chartId) => {
        const ctx = document.getElementById(chartId);
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="col-md-9">
                        {/* <div className="search-bar1 d-flex justify-content-center align-items-center">
                            <input type="text" className="search-inpu form-control" placeholder="Search..." value={searchQuery}
                                onChange={handleSearchChange} />
                            <button className="btndesign btn btn-outline-secondary" type="button">
                                <img src={searchIcon} alt="Search" width="20" height="20" />
                            </button>
                        </div> */}
                        <div className="dropdown-reports">
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
                        <br />
                        <h2 className='Report-heading'>Reports</h2>
                        <div className='desc-report'>Here You Can See Your Weekly Mood Reports. Day1 starts with Monday onwards.</div>
                        <div className="container py-5">
                            <h3 className='Report-heading2'>Previous Week's Ratings ({previousWeek})</h3>
                            <table className="table table-bordered">
                                <thead>
                                    <tr className='table-color'>
                                        {['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                                            <th className='table-color' key={index}>{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {ratings.map((rating, index) => (
                                            <td key={index}>{rating}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn report-btn mt-4" onClick={() => generateGraph(ratings, 'previousRatingChart')}>Generate Graph</button>
                            <div className="mt-5">
                                <canvas id="previousRatingChart" width="300" height="150"></canvas>
                            </div>

                            <h3 className="mt-5">Current Week's Ratings ({week})</h3>
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
                                            value={rating || ''}
                                            onChange={(e) => handleRatingChange(index, parseInt(e.target.value))}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="btn report-btn mt-4" onClick={saveRatings}>Save Ratings</button>
                            <button className="btn report-btn mt-4" onClick={() => generateGraph(ratings, 'currentRatingChart')}>Generate Graph</button>
                            <div className="mt-5">
                                <canvas id="currentRatingChart" width="300" height="150"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Reporting);
