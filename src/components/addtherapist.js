import React, { useState } from 'react';
import axios from 'axios';
// import '../styles/therapist.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Therapist() {
  const [therapists, setTherapists] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [existingPassword, setExistingPassword] = useState(''); // For existing therapist's password
  const [message, setMessage] = useState('');

  const handleAddTherapist = async (e) => {
    e.preventDefault();

    const newTherapist = { username: name, email, password };
    try {
      const response = await axios.post('http://localhost:8000/addtherapist', { // Use axios.post instead of fetch
        newTherapist,
        existingTherapistPassword: existingPassword,
      });

      const data = await response.json();

      if (response.ok) {
        setTherapists([...therapists, newTherapist]);
        setName('');
        setEmail('');
        setPassword('');
        setExistingPassword('');
        setMessage('New therapist added successfully');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>
        {/* <FontAwesomeIcon icon={faPlus} /> */}
        Add <br /> Therapist
      </h1>
      <form style={{ backgroundColor: '#2F3059', padding: '20px' }} onSubmit={handleAddTherapist}>
        <label style={{ textAlign: 'left' }}>
          <p>Name:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Enter name"
            style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', width: '100%' }}
          />
        </label>
        <label style={{ textAlign: 'left' }}>
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Enter email"
            style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', width: '100%' }}
          />
        </label>
        <label style={{ textAlign: 'left' }}>
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Enter password"
            style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', width: '100%' }}
          />
        </label>
        <label style={{ textAlign: 'left' }}>
          <p>Existing Therapist Password:</p>
          <input
            type="password"
            value={existingPassword}
            onChange={(e) => setExistingPassword(e.target.value)}
            className="input-field"
            placeholder="Enter your password"
            style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', width: '100%' }}
          />
        </label>
        <br />
        <br />
        <button type="submit" className="btn-custom w-100 btn btn-lg fw-bold" style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', color: '#2F3059' }}>
          <span>Add Therapist</span>
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Therapist;