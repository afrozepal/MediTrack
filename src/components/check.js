import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar1 from '../components/Sidebar1';
import '../styles/assign.css';

const DisplayAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const { userId } = useParams(); // Extract userId from URL parameters
  const username = useSelector(state => state.username);



  useEffect(() => {
    // Fetch the answers when the component mounts
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getanswers/${userId}`);
        setAnswers(response.data.questions); // Assume the response data contains an array of answers
      } catch (error) {
        console.error('Error fetching answers:', error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchAnswers();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const answerIds = userId; // Extract answer IDs
      const response = await axios.delete('http://localhost:8000/deleteanswers', { data: { answerIds } });
      setAnswers([]); // Clear the answers from state after deletion
      alert("Checked!");
    } catch (error) {
      console.error('Error deleting answers:', error);
    }
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar1 />
        </div>
        <div className="col-md-9">
          <div className="dropdown-assign">
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
          <h2 className='Articles-heading'>Check Homework</h2>
          <div className='desc-profile'>You can Check Homework submitted by your clients here.</div>
          <div className="container mt-4">
            <h2 className="Articles-heading">User Answers</h2>
            {answers.length === 0 ? (
              <div className="alert alert-info" role="alert">
                No answers found for this user.
              </div>
            ) : (
              <ul className="list-group">
                {answers.map((answer, index) => (
                  <li key={index} className="list-group-item">
                    <p className="mb-1"><strong>Question:</strong> {answer.questionText}</p>
                    <p className="mb-0"><strong>Answer:</strong> {answer.answerText}</p>
                  </li>
                ))}
              </ul>
            )}
            <button className='btn btn-primary' onClick={handleDelete} >Marked As Checked</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DisplayAnswers;
