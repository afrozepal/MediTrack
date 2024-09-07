import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar2 from '../components/Sidebar2';
import { useSelector } from 'react-redux';
import '../styles/therapist.css';
import withAuth from '../utils/withAuth';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const username = useSelector(state => state.username);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const response = await axios.get('http://localhost:8000/gettherapists'); // Adjust the API endpoint
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      setMessage('Error fetching doctors');
      console.error('Error fetching doctors:', error);
    }
  }

  // Navigate to doctor details when View button is clicked
  const handleViewDoctor = (doctorId) => {
    navigate(`/doctors/${doctorId}`); // Navigate to DoctorDetails page with doctorId
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar2 />
        </div>
        <div className="col-md-9">
          <div className="dropdown-therapist">
            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <p className='username-text'>Welcome {username}</p>
            <ul className="dropdown-menu text-small shadow">
              <li><a className="dropdown-item" href="/">My Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/">Sign out</a></li>
            </ul>
          </div>
          <br />
          <h2 className='Articles-heading'>Doctors</h2>
          <div className='desc-profile'>Here you can view all doctors.</div>

          <div className="container-fluid">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div>
                  <ul className="candidate-list">
                    {doctors.map(doctor => (
                      <li key={doctor._id} className="candidate-list-box card mt-4">
                        <div className="ther-card p-4 card-body">
                          <div className="align-items-center row">
                            <div className="col-auto">
                              <div className="candidate-list-images">
                                <a href="/">
                                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-md img-thumbnail rounded-circle" />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="candidate-list-content mt-3 mt-lg-0">
                                <h3 className="fs-19 mb-0">
                                  <a className="text-username primary-link" href="/">{doctor.name}</a>
                                </h3>
                                <p className="text-username ">{doctor.email}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button className='btn btn-addclient' onClick={() => handleViewDoctor(doctor._id)}>View</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Doctors);
