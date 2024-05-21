import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../utils/withAuth';

const TherapistDashboard = ({ user }) => {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/therapist/clients', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError('Error fetching clients');
            }
        };

        fetchClients();
    }, []);

    const handleClientClick = (clientId) => {
        navigate(`/client/${clientId}`);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <h2>Your Clients</h2>
            {clients.length === 0 ? (
                <p>No clients found</p>
            ) : (
                <ul>
                    {clients.map((client) => (
                        <li key={client._id} onClick={() => handleClientClick(client._id)}>
                            {client.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default withAuth(TherapistDashboard);
