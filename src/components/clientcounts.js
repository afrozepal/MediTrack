import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TherapistClients = () => {
  const [therapistsWithClientCount, setTherapistsWithClientCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Count clients for each therapist
        const therapistsWithCountResponse = await axios.get('http://localhost:8000/therapistswithclientcount');
        const therapistsWithCount = therapistsWithCountResponse.data;

        setTherapistsWithClientCount(therapistsWithCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Therapists and Their Clients</h2>
      <ul className="list-group">
        {therapistsWithClientCount.map((therapist, index) => (
          <li key={index} className="list-group-item">
            <h4>{therapist.name}</h4>
            <p>Email: {therapist.email}</p>
            <p>Clients: {therapist.clientCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapistClients;