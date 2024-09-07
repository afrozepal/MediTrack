import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/history.css';

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [suser, setUser] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  function getUser() {
    const userStr = getCookie('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr); // Convert string back to object
        setUser(user);
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Failed to parse user cookie:', e);
      }
    }
    return null;
  }

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/appointmentshistory');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointment history:', error);
        setError('Error fetching appointment history');
      }
    };
    fetchAppointments();
  }, []);

  const handleChangeSlot = async (appointmentId, newSlot) => {
    try {
      await axios.put(`http://localhost:8000/changeslot/${appointmentId}`, {
        slot: newSlot,
      });
      const updatedAppointments = await axios.get('http://localhost:8000/appointmentshistory');
      setAppointments(updatedAppointments.data);
    } catch (error) {
      console.error('Error changing slot:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Appointment History</h2>
      {error && <p className="text-danger">{error}</p>}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>Doctor Name</th>
              <th>Description</th>
              <th>Slot</th>
              <th>Status</th>
              <th>Prescription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>Dr. {appointment.doctorId?.name || 'Unknown'}</td>
                <td>{appointment.description}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.status}</td>
                <td>{appointment.prescription ? appointment.prescription : 'No prescription'}</td>
                <td>
                  {appointment.status === 'pending' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleChangeSlot(appointment._id, 'new-slot-value')}
                    >
                      Change Slot
                    </button>
                  )}
                  {appointment.status === 'completed' && <p className="text-success">Completed</p>}
                  {appointment.status === 'cancelled' && <p className="text-danger">Cancelled</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AppointmentHistory;
