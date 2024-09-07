import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import searchIcon from '../assets/icons8-search-100.png';
import '../styles/Homework.css';

const AddHwt = (props) => {
  const { user } = props;
  const [questions, setQuestions] = useState([{ type: 'scale', text: '' }]);
  const [answers, setAnswers] = useState([]);
  const username = useSelector(state => state.username);
  const [searchQuery, setSearchQuery] = useState('');

  const getquestions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getquestions', {
        params: { userId: user.userId }
      });
      console.log(response.data);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error getting questions:', error);
    }
  };

  useEffect(() => {
    getquestions();

    // Establish WebSocket connection
    const socket = new WebSocket(`ws://localhost:8080/${user.userId}`);

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      if (notification.type === 'homeworkAssigned') {
        alert(notification.message);
        // Optionally, you can fetch new questions here
        getquestions();
      }
    };

    // Clean up WebSocket connection when component unmounts
    return () => socket.close();
  }, [user.userId]);




  // useEffect(() => {
  //   getquestions();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const answerArray = [];
    questions.forEach((question, index) => {
      if (question.type === 'scale') {
        const scaleAnswer = document.querySelector(`input[name="scale-${index}"]:checked`).value;
        answerArray.push({ questionId: question._id, answer: scaleAnswer });
      } else if (question.type === 'yes-no') {
        const yesNoAnswer = document.querySelector(`input[name="yes-no-${index}"]:checked`).value;
        answerArray.push({ questionId: question._id, answer: yesNoAnswer });
      } else {
        const textAnswer = document.querySelector(`textarea[name="text-${index}"]`).value;
        answerArray.push({ questionId: question._id, answer: textAnswer });
      }
    });
    setAnswers(answerArray);
    alert("Homework Submitted Succesfully!");
    // setQuestions('');
    // setAnswers('');
    try {
      const response = await axios.post('http://localhost:8000/updateanswers', { answers: answerArray });
      console.log('Answers submitted:', response.data);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">


          <div className="dropdown-profile">
            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <p className='username-text'>Welcome {username}</p>
            <ul className="dropdown-menu text-small shadow">
              <li><a className="dropdown-item" href="/">My Profile</a></li>
              {/* <li><a className="dropdown-item" href="/">Settings</a></li> */}
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/">Sign out</a></li>
            </ul>
          </div>
          <br />
          <h2 className='Articles-heading'>Homework</h2>
          <div className='desc-profile'>Here you can complete all the tasks assigned by your therapist.</div>
          <div className="container mt-4">
            <div className="card shadow p-4">
              <form onSubmit={handleSubmit}>
                <h3 className='Articles-heading'>The questions assigned to you are: </h3>
                {questions.map((question, index) => (
                  <div key={index} className="mb-3">
                    <label className="form-label">{question.text}</label>
                    {question.type === 'scale' ? (
                      <div>
                        {[1, 2, 3, 4, 5].map(value => (
                          <div className="form-check form-check-inline" key={value}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`scale-${index}`}
                              id={`scale-${index}-${value}`}
                              value={value}
                            />
                            <label className="form-check-label" htmlFor={`scale-${index}-${value}`}>
                              {value}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : question.type === 'yes-no' ? (
                      <div>
                        {['yes', 'no'].map(value => (
                          <div className="form-check form-check-inline" key={value}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`yes-no-${index}`}
                              id={`yes-no-${index}-${value}`}
                              value={value}
                            />
                            <label className="form-check-label" htmlFor={`yes-no-${index}-${value}`}>
                              {value.charAt(0).toUpperCase() + value.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        className="form-control"
                        placeholder="Enter your answer"
                        name={`text-${index}`}
                        rows="3"
                      />
                    )}
                  </div>
                ))}
                <Link to='/profile' type="submit" className="btn btn-custom-homework" onClick={handleSubmit}>
                  Submit
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AddHwt);