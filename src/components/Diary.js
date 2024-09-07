import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/Diary.css';
import withAuth from '../utils/withAuth';
import { useSelector } from 'react-redux';
import searchIcon from '../assets/icons8-search-100.png';

const Diary = (props) => {
    // const id = localStorage.getItem('._id');
    const { user } = props;
    const userid = user.userId;
    const [selectedDate, setSelectedDate] = useState(null);
    const [diaryEntry, setDiaryEntry] = useState('');
    const [diary, setDiary] = useState([]);
    const username = useSelector(state => state.username);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDiaryEntry = async () => {
            try {
                const response = await axios.get('http://localhost:8000/fetchdiary?date=${selectedDate}&userId=${userid}');

                if (response.data) {
                    setDiaryEntry(response.data.entry);
                    console.log(response.data.entry)
                    console.log("response.data.entry")
                } else {
                    setDiaryEntry('');
                }
            } catch (error) {
                console.error('Error fetching diary entry:', error);
            }
        };

        if (selectedDate && userid) {
            fetchDiaryEntry();
        }
    }, [selectedDate, userid]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/diary', {
                userId: userid,
                date: selectedDate,
                entry: diaryEntry
            });
            setDiary([...diary, response.data]);
            setDiaryEntry('');
        } catch (error) {
            console.error('Error submitting diary entry:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    const filteredDiaries = diary.filter(article => {
        return article.date.includes(searchQuery);
    });

    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="search-bar1 d-flex justify-content-center align-items-center">
                            <input type="text" className="search-inpu form-control" placeholder="Search..." value={searchQuery}
                                onChange={handleSearchChange} />
                            <button className="btndesign btn btn-outline-secondary" type="button">
                                <img src={searchIcon} alt="Search" width="20" height="20" />
                            </button>
                        </div>
                        <div className="dropdown-profile">
                            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <p className='username-text'>Welcome {username}</p> {/* Display the username here */}
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="/">My Profile</a></li>
                                {/* <li><a className="dropdown-item" href="/">Settings</a></li> */}
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        <br />
                        <h2 className='Articles-heading'>Diary</h2>
                        <div className='desc-profile'>Here you can take your everyday notes and write about everything feeling secure and safe.</div>
                        {/* My articles start here */}
                        <div className="diary-container">

                            <div className="diary-content">
                                <div className="date-picker">
                                    <h3>Select Date:</h3>
                                    <input type="date" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => handleDateSelect(e.target.value)} />
                                </div>
                                {selectedDate && (
                                    <div className="entry-section">
                                        <h3>{selectedDate}</h3>
                                        <textarea
                                            value={diaryEntry}
                                            onChange={(e) => setDiaryEntry(e.target.value)}
                                            rows={10}
                                            cols={50}
                                        />
                                        <button onClick={handleSubmit}>Save Entry</button>
                                    </div>
                                )}
                                <div className="diary-entries">
                                    <h2>Diary Entries</h2>
                                    {filteredDiaries.map((entry) => (
                                        <div key={entry._id} className="entry-item">
                                            <p><strong>Date:</strong> {entry.date}</p>
                                            <p><strong>Entry:</strong> {entry.entry}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default withAuth(Diary);
