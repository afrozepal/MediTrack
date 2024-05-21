import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const { userId } = useParams(); // Extract userId from URL parameters

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

  return (
    <div className="container">
      <h2>User Answers</h2>
      {answers.length === 0 ? (
        <p>No answers found for this user.</p>
      ) : (
        <ul className="list-group">
          {answers.map((answer, index) => (
            <li key={index} className="list-group-item">
              <p><strong>Question:</strong> {answer.questionText}</p>
              <p><strong>Answer:</strong> {answer.answerText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAnswers;
