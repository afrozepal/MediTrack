import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar1 from '../components/Sidebar1';
import '../styles/assign.css';

const therapistId = '66474ecf404432af22a36eae'; // Hardcoded therapistId for testing

const AddQuestion = () => {
  const [questions, setQuestions] = useState([{ type: 'scale', text: '' }]);
  const { userId } = useParams(); // Extract userId from URL parameters
  const username = useSelector(state => state.username);

  // NOTIFICATION FUNCTIONALITY 
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/${userId}`);

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      if (notification.type === 'homeworkAssigned') {
        alert(notification.message);
      }
    };

    return () => socket.close();
  }, [userId]);


  const handleQuestionTypeChange = (index, newType) => {
    const updatedQuestions = questions.map((question, idx) =>
      idx === index ? { ...question, type: newType } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleQuestionTextChange = (index, newText) => {
    const updatedQuestions = questions.map((question, idx) =>
      idx === index ? { ...question, text: newText } : question
    );
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { type: 'scale', text: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/addquestions', {
        therapistId: therapistId, // Pass the therapistId to the API endpoint
        userId: userId, // Pass the userId to the API endpoint
        questions
      });
      alert("Homework Assigned Successfully!");
    } catch (error) {
      console.error('Error submitting questions:', error);
      // Handle error (e.g., show an error message)
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
          <h2 className='Articles-heading'>Assign Homework</h2>
          <div className='desc-profile'>You can Assign Homework to your clients here.</div>

          <div className="container">
            <h2>Add Questions</h2>
            <form onSubmit={handleSubmit}>
              {questions.map((question, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">Question {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your question"
                    value={question.text}
                    onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                    required
                  />
                  <select
                    className="form-select mt-2"
                    value={question.type}
                    onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
                  >
                    <option value="scale">Scale (1-5)</option>
                    <option value="yes-no">Yes/No</option>
                    <option value="open-ended">Open Ended</option>
                  </select>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={addQuestion}>
                Add Another Question
              </button>
              <button onclick={handleSubmit} type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
