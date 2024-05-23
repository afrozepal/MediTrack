import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '../utils/withAuth';
import { useSelector } from 'react-redux';
import Sidebar1 from '../components/Sidebar1';
import searchIcon from '../assets/icons8-search-100.png';

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = props;
  const tid = user.userId;
  // const [searchQuery, setSearchQuery] = useState('');
  const username = useSelector(state => state.username);

  const handleUserSelect = (userId) => {
    axios.post('http://localhost:8000/addclients', { therapistId: tid, userId: userId });
    alert('User added!');
    console.log(`User selected: ${userId}`);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/getusers')
      .then(response => {
        setUsers(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar1 />
        </div>
        <div className="col-md-9">
          <div className="search-bar1 d-flex justify-content-center align-items-center">
            <input type="text" className="search-input form-control" placeholder="Search..." value={searchTerm}
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
              <li><a className="dropdown-item" href="/">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/">Sign out</a></li>
            </ul>
          </div>
          <br />
          <h2 className='Articles-heading'>Add Clients</h2>
          <div className='desc-profile'>Here you can add clients.</div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div>
              <ul className="candidate-list">
                {filteredUsers.map(user => (
                  <li key={user._id} className="candidate-list-box card mt-4">
                    <div className="ther-card p-4 card-body">
                      <div className="align-items-center row">
                        <div className="col-auto">
                          <div className="candidate-list-images">
                            <a href="/"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-md img-thumbnail rounded-circle" /></a>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="candidate-list-content mt-3 mt-lg-0">
                            <h3 className="fs-19 mb-0">
                              <a className="text-username primary-link" href="/">{user.username}</a>
                            </h3>
                            <p className="text-username ">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div >
                        <button className='btn btn-addclient' onClick={() => handleUserSelect(user._id)}>Add</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(UsersList);