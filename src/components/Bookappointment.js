import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/bookAppointment.css';

function Bookappointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [description, setDescription] = useState('');
  
  const [email ,setEmail]=useState(null);
  const [suser,setUser]=useState(null);
  function getCookie(name) {
    // console.log('kiya' , name);
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  // Function to retrieve and parse the user object from a cookie
  function getUser() {
    const userStr = getCookie('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr); // Convert string back to object
        console.log("User is:", user);
        setUser(user);
        return (JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse user cookie:', e);
      }
    }
    return null;
  }
  useEffect(() => {
    
    const fetchDoctors = async () => {
      getUser();
      try {
        const response = await axios.get('http://localhost:8000/gettherapists');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

  //   const fetchEmail = async (suser) => {
  //     try {
  //         const response = await axios.get(`http://localhost:8000/getemail/${userId}`);
  //         setEmail(response.data.email);
  //       } catch (error) {
  //         console.error('Error fetching doctors:', error);
  //       }
  // };

    fetchDoctors();
  }, []);

  const handleDoctorChange = (e) => {
    const doctor = doctors.find(d => d.name === e.target.value);
    setSelectedDoctor(doctor);
  };

  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return new Date().setHours(hours, minutes, 0, 0); // Return timestamp in milliseconds
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  const generateTimeSlots = (startTime, endTime, intervalMinutes) => {
    const slots = [];
    const start = new Date(parseTime(startTime));
    let end = new Date(parseTime(endTime));

    // Handle case where end time is exactly midnight
    if (end.getHours() === 0 && end.getMinutes() === 0 && end.getSeconds() === 0 && end.getMilliseconds() === 0) {
      end.setDate(end.getDate() + 1); // Move end time to the next day
    }

    let current = start;
    while (current < end) {
      slots.push(formatTime(current));
      current = new Date(current.getTime() + intervalMinutes * 60000); // Add interval in milliseconds
    }

    return slots;
  };

  const getSlots = (timings) => {
    // console.log("timings", timings);
    let allSlots = [];

    if (Array.isArray(timings)) {
      timings.forEach(timing => {
        // Split the timing string into start and end times
        const [startTime, endTime] = timing.split(' to ').map(str => str.trim());
        if (startTime && endTime) {
          // console.log(`Generating slots from ${startTime} to ${endTime}`);
          allSlots = allSlots.concat(generateTimeSlots(startTime, endTime, 15));
        }
      });
    }

    // console.log("Generated slots", allSlots);
    return allSlots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedSlot || !description) {
      alert('Please fill in all the fields.');
      return;
    }
    console.log("check iss" , suser);
    try {
      const appointment = {
        doctorId: selectedDoctor._id, // Assuming `selectedDoctor` has an `_id` field
        userId: suser.userId,
        slot: selectedSlot,
        description,
      };
  
      await axios.post('http://localhost:8000/appointments', appointment);
      alert('Appointment booked successfully!');
      // Clear form after submission
      setSelectedDoctor(null);
      setSelectedSlot('');
      setDescription('');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book the appointment. Please try again.');
    }
  };
  

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Book a Doctor's Appointment</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="doctorSelect">
                  <Form.Label>Select Doctor</Form.Label>
                  <Form.Control as="select" onChange={handleDoctorChange}>
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor, index) => (
                      <option key={index} value={doctor.name}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {selectedDoctor && (
                  <>
                    <Form.Group controlId="slotSelect">
                      <Form.Label>Select Time Slot</Form.Label>
                      <Form.Control as="select" onChange={(e) => setSelectedSlot(e.target.value)}>
                        <option value="">Select a time slot</option>
                        {getSlots(selectedDoctor.timings).map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your issue or reason for the visit..."
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='mt-5'>
                      Confirm Appointment
                    </Button>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Bookappointment;
