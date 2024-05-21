import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import Sidebar1 from '../components/Sidebar1';

function TherapistProfile(props) {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = props;
    const id = user.userId;
    console.log(id);


    useEffect(() => {
        fetchClients();
    }, []);

    async function fetchClients() {
        try {
            const response = await axios.get('http://localhost:8000/getclients', {
                params: {
                    therapistId: id // Replace with the actual therapist ID
                }
            });
            setClients(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    }
    if (loading) {
        return <div>;Loading...</div>;
    }

    return (
        <div className="container">
            <Sidebar1 />
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="text-primary">Welcome to your therapist profile</h1>
                    <div className="d-flex justify-content-center mb-4">
                        <Link to="/schedule" className="btn btn-primary me-2">Schedule</Link>
                        <Link to="/chat" className="btn btn-primary me-2">Chat</Link>
                        <Link to="/billing" className="btn btn-primary">Billing</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Clients:</h2>
                    <div className="row">
                        {clients.map(client => (
                            <div className="col-md-4 mb-3" key={client._id}>
                                <div className="card-body">
                                    <h5 className="card-title"> {client.user.name}</h5>
                                    <p className="card-text" ><strong>Email:</strong>; {client.user.email}</p>
                                    <Link to={`/addhwt/${client.user._id}`} className="btn btn-primary">Assign</Link>
                                    <Link to={`/check/${client.user._id}`} className="btn btn-primary">Check</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default withAuth(TherapistProfile);

