import React, { useState } from 'react';
import axios from 'axios';
import '../styles/therapist.css';
import Sidebar1 from '../components/Sidebar1';
import { useSelector } from 'react-redux';
import withAuth from '../utils/withAuth';

function Therapist(props) {
  const [therapists, setTherapists] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [existingPassword, setExistingPassword] = useState(''); // For existing therapist's password
  const [message, setMessage] = useState('');
  const username = useSelector(state => state.username);

  const { user } = props;
  const therapistid = user.userId;

  const handleAddTherapist = async (e) => {
    e.preventDefault();

    const newTherapist = { username: name, email, password };
    try {
      const response = await axios.post('http://localhost:8000/addtherapist', { // Use axios.post instead of fetch
        newTherapist,
        existingTherapistPassword: existingPassword,
        therapistid,
      });

      const data = await response.json();
      alert('New therapist added successfully!');
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
      alert('Error Adding Therapist!');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar1 />
        </div>
        <div className="col-md-9">
          <div className="dropdown-therapist">
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
          <h2 className='Articles-heading'>Add Therapist</h2>
          <div className='desc-profile'>You can add therapist.</div>

          <div className="container-fluid">
            <form className='container-back' style={{ backgroundColor: '#2F3059', padding: '20px' }} onSubmit={handleAddTherapist}>
              <label style={{ textAlign: 'center' }}>
                <p className='text-addtherstyle lead'>Name:</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field-therapist form-control"
                  placeholder="Enter name"
                  style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', width: '100%' }}
                />
              </label>
              <label style={{ textAlign: 'center' }}>
                <p className='text-addtherstyle lead'>Email:</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field-therapist form-control"
                  placeholder="Enter email"
                  style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', width: '100%' }}
                />
              </label>
              <label style={{ textAlign: 'center' }}>
                <p className='text-addtherstyle lead'>Password:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field-therapist form-control"
                  placeholder="Enter password"
                  style={{ backgroundColor: '#BAB2EF', borderColor: '#BAB2EF', width: '100%' }}
                />
              </label>
              <label style={{ textAlign: 'center' }}>
                <p className='text-addtherstyle lead'>Existing Therapist Password:</p>
                <input
                  type="password"
                  value={existingPassword}
                  onChange={(e) => setExistingPassword(e.target.value)}
                  className="input-field-therapist form-control"
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
        </div>
      </div>
    </div>
  );
}

export default withAuth(Therapist);