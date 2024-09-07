import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar1 from '../components/Sidebar1';
import { useSelector } from 'react-redux';
import searchIcon from '../assets/icons8-search-100.png';

const TherapistClients = () => {
  const [therapistsWithClientCount, setTherapistsWithClientCount] = useState([]);
  const username = useSelector(state => state.username);
  const [searchQuery, setSearchQuery] = useState('');

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


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredtherapistsWithClientCount = therapistsWithClientCount.filter(cli => {
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
              <li><a className="dropdown-item" href="/">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/">Sign out</a></li>
            </ul>
          </div>
          <br />
          <h2 className='Articles-heading'>Therapists and their Clients</h2>
          <div className='desc-profile'>Data of all therapists and their clients.</div>

          <div className="container">
            <ul className="list-group">
              {filteredtherapistsWithClientCount.map((therapist, index) => (
                <li key={index} className="list-group-item">
                  <h4>{therapist.name}</h4>
                  <p>Email: {therapist.email}</p>
                  <p>Clients: {therapist.clientCount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistClients;