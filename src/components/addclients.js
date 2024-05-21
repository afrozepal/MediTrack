import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '../utils/withAuth';

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = props;
  const tid = user.userId;

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Users List</h1>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search users"
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user._id}>
            {user.username} {user.email}
            <button onClick={() => handleUserSelect(user._id)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withAuth(UsersList);