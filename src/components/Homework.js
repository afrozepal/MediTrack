import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import { useSelector } from 'react-redux';

const AddHwt = (props) => {
  const { user } = props;
  const [questions, setQuestions] = useState([{ type: 'scale', text: '' }]);
  const [answers, setAnswers] = useState([]);
  const username = useSelector(state => state.username);

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
  }, []);

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
    try {
      const response = await axios.post('http://localhost:8000/updateanswers', { answers: answerArray });
      console.log('Answers submitted:', response.data);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div>
      <h2>Homework</h2>
      <p>username: {username}</p>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">{question.text}</label>
            {question.type === 'scale' ? (
              <div>
                <label>1</label>
                <input type="radio" name={`scale-${index}`} value="1" />
                <label>2</label>
                <input type="radio" name={`scale-${index}`} value="2" />
                <label>3</label>
                <input type="radio" name={`scale-${index}`} value="3" />
                <label>4</label>
                <input type="radio" name={`scale-${index}`} value="4" />
                <label>5</label>
                <input type="radio" name={`scale-${index}`} value="5" />
              </div>
            ) : question.type === 'yes-no' ? (
              <div>
                <label>Yes</label>
                <input type="radio" name={`yes-no-${index}`} value="yes" />
                <label>No</label>
                <input type="radio" name={`yes-no-${index}`} value="no" />
              </div>
            ) : (
              <textarea placeholder="Enter your answer" name={`text-${index}`} />
            )}
          </div>
        ))}
        <Link to='/profile' type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</Link>
      </form>
    </div>
  );
};

export default withAuth(AddHwt);