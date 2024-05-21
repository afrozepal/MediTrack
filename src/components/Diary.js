import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/Diary.css';
import withAuth from '../utils/withAuth';
// import { useSelector, useDispatch } from 'react-redux'

const Diary = (props) => {
    // const id = localStorage.getItem('._id');
    const { user } = props;
    const userid = user.userId;
    const [selectedDate, setSelectedDate] = useState(null);
    const [diaryEntry, setDiaryEntry] = useState('');
    const [diary, setDiary] = useState([]);

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

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <Sidebar />
            <div className="diary-container">

                <div className="diary-content">
                    <h1 className="diary-title">Diary</h1>
                    <div className="date-picker">
                        <h3>Select Date:</h3>
                        <input type="date" onChange={(e) => handleDateSelect(e.target.value)} />
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
                        {diary.map((entry) => (
                            <div key={entry._id} className="entry-item">
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>Entry:</strong> {entry.entry}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default withAuth(Diary);