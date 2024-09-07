import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar2 from '../components/Sidebar2';
import '../styles/therapist.css';

function DoctorDetails() {
  const { doctorId } = useParams(); // Getting doctorId from the URL
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch appointments for the doctor
    async function fetchAppointments() {
      try {
        const response = await axios.get(`http://localhost:8000/appointments/doctor/${doctorId}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError('No appointments found for this doctor.');
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [doctorId]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar2 />
        </div>
        <div className="col-md-9">
          <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
            Back
          </button>
          <h2 className="Articles-heading">Doctor Appointment Details</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="appointments-list">
              {appointments.map(appointment => (
                <div key={appointment._id} className="appointment-card card mt-3">
                  <div className="card-body">
                    <h5 className="card-title">Appointment with: {appointment.userId}</h5>
                    <p><strong>Slot:</strong> {appointment.slot}</p>
                    <p><strong>Description:</strong> {appointment.description}</p>
                    <p><strong>Date:</strong> {new Date(appointment.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
