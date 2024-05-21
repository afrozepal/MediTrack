import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const therapistId = '66474ecf404432af22a36eae'; // Hardcoded therapistId for testing

const AddQuestion = () => {
  const [questions, setQuestions] = useState([{ type: 'scale', text: '' }]);
  const { userId } = useParams(); // Extract userId from URL parameters

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
    } catch (error) {
      console.error('Error submitting questions:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
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
        <Link to="/therapist" type="submit" className="btn btn-primary mt-3">
          Submit
        </Link>
      </form>
    </div>
  );
};

export default AddQuestion;
