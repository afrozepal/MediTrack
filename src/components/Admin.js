import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import Sidebar2 from '../components/Sidebar2';
import { useSelector } from 'react-redux';
import searchIcon from '../assets/icons8-search-100.png';
import '../styles/therapist.css';

function AdminPage(props) {
    const [users, setUsers] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const username = useSelector(state => state.username);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchTherapists();
    }, []);

    async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost:8000/getusers'); // Adjust the endpoint as needed
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users');
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchTherapists() {
        try {
            const response = await axios.get('http://localhost:8000/gettherapists');
            setTherapists(response.data);
        } catch (error) {
            setError('Error fetching therapists');
            console.error('Error fetching therapists:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredTherapists = therapists.filter(therapist => 
        therapist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

return (
  <div className="container-fluid">
      <div className="row">
          <div className="col-md-3">
              <Sidebar2 />
          </div>
          <div className="col-md-9">
              <div className="search-bar1 d-flex justify-content-center align-items-center">
                  <input type="text" className="search-input form-control" placeholder="Search..." value={searchQuery}
                      onChange={handleSearchChange} />
                  <button className="btndesign btn btn-outline-secondary" type="button">
                      <img src={searchIcon} alt="Search" width="20" height="20" />
                  </button>
              </div>
              <div className="dropdown-profile">
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
              <h2 className='Articles-heading'>Admin Dashboard</h2>
              <div className='desc-profile'>Here you can manage all users and therapists.</div>

              <h3>Patients</h3>
              <table className="table table-striped">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredUsers.map(user => (
                          <tr key={user._id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>

              <h3>Therapists</h3>
              <table className="table table-striped">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Email</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredTherapists.map(therapist => (
                          <tr key={therapist._id}>
                              <td>{therapist.name}</td>
                              <td>{therapist.email}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>

          </div>
      </div>
  </div>
);
}
export default withAuth(AdminPage);