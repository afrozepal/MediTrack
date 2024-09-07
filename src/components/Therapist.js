import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import Sidebar1 from '../components/Sidebar1';
import { useSelector } from 'react-redux';
import searchIcon from '../assets/icons8-search-100.png';
import '../styles/therapist.css';

function TherapistProfile(props) {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const username = useSelector(state => state.username);

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
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredClients = clients.filter(cli => {
        return cli.user && cli.user.name && cli.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar1 />
                </div>
                <div className="col-md-9">
                    <div className="search-bar1 d-flex justify-content-center align-items-center">
                        <input type="text" className="search-inpu form-control" placeholder="Search..." value={searchQuery}
                            onChange={handleSearchChange} />
                        <button className="btndesign btn btn-outline-secondary" type="button">
                            <img src={searchIcon} alt="Search" width="20" height="20" />
                        </button>
                    </div>
                    <div className="dropdown-profile">
                        <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        </a>
                        <p className='username-text'>Welcome {username}</p> {/* Display the username here */}
                        <ul className="dropdown-menu text-small shadow">
                            <li><a className="dropdown-item" href="/">My Profile</a></li>
                            {/* <li><a className="dropdown-item" href="/">Settings</a></li> */}
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/">Sign out</a></li>
                        </ul>
                    </div>
                    <br />
                    <h2 className='Articles-heading'>Therapist Profile</h2>
                    <div className='desc-profile'>Here you can find all your clients.</div>

        
                    <div className='<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' >
                        {filteredClients.map(client => (
                            <div key={client._id}>
                                <div className="therapist-cards card">
                                    <h5 className="card-title"> {client.user.name}</h5>
                                    <p className="card-text" ><strong>Email:</strong> {client.user.email}</p>
                                    <Link to={`/addhwt/${client.user._id}`} className="btn btn-therapyA">Assign</Link>
                                    <Link to={`/check/${client.user._id}`} className="btn btn-therapyC">Check</Link>
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

