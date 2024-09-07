// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/therapist.css';
// import Sidebar2 from '../components/Sidebar2';
// import { useSelector } from 'react-redux';
// import withAuth from '../utils/withAuth';

// function Patients(props) {
//   const [clients, setClients] = useState([]);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const username = useSelector(state => state.username);

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   async function fetchClients() {
//     try {
//       const response = await axios.get('http://localhost:8000/getusers'); // Adjust the endpoint as needed
//       setClients(response.data);
//       setLoading(false);
//     } catch (error) {
//       setMessage('Error fetching clients');
//       console.error('Error fetching clients:', error);
//     }
//   }

//   const handleViewClient = (client) => {
//     setSelectedClient(client);
//   };

// //   return (
// //     <div className="container-fluid">
// //       <div className="row">
// //         <div className="col-md-3">
// //           <Sidebar2 />
// //         </div>
// //         <div className="col-md-9">
// //           <div className="dropdown-therapist">
// //             <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
// //               <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
// //             </a>
// //             <p className='username-text'>Welcome {username}</p>
// //             <ul className="dropdown-menu text-small shadow">
// //               <li><a className="dropdown-item" href="/">My Profile</a></li>
// //               <li><hr className="dropdown-divider" /></li>
// //               <li><a className="dropdown-item" href="/">Sign out</a></li>
// //             </ul>
// //           </div>
// //           <br />
// //           <h2 className='Articles-heading'>Clients</h2>
// //           <div className='desc-profile'>Here you can view all clients.</div>

// //           <div className="container-fluid">
// //             {loading ? (
// //               <p>Loading...</p>
// //             ) : (
// //               <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
// //                 {clients.map(client => (
// //                   <div key={client._id} className="col mb-4">
// //                     <div className="admin-cards card shadow-sm">
// //                       <div className="card-body">
// //                         <h5 className="card-title">{client.name}</h5>
// //                         <p className="card-text"><strong>Email:</strong> {client.email}</p>
// //                         <p className="card-text"><strong>Phone:</strong> {client.phone}</p>
// //                         <button onClick={() => handleViewClient(client)} className="btn btn-primary">View</button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //             {selectedClient && (
// //               <div className="client-details mt-4">
// //                 <h3>Client Details</h3>
// //                 <p><strong>Name:</strong> {selectedClient.name}</p>
// //                 <p><strong>Email:</strong> {selectedClient.email}</p>
// //                 <p><strong>Phone:</strong> {selectedClient.phone}</p>
// //                 <p><strong>Address:</strong> {selectedClient.address}</p>
// //                 {/* Add more client details as needed */}
// //               </div>
// //             )}
// //             {message && <p>{message}</p>}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-3">
//           <Sidebar2 />
//         </div>
//         <div className="col-md-9">
//           <div className="dropdown-therapist">
//             <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//               <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
//             </a>
//             <p className='username-text'>Welcome {username}</p>
//             <ul className="dropdown-menu text-small shadow">
//               <li><a className="dropdown-item" href="/">My Profile</a></li>
//               <li><hr className="dropdown-divider" /></li>
//               <li><a className="dropdown-item" href="/">Sign out</a></li>
//             </ul>
//           </div>
//           <br />
//           <h2 className='Articles-heading'>Clients</h2>
//           <div className='desc-profile'>Here you can view all clients.</div>

//           <div className="container-fluid">
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
//                 <div>
//                   <ul className="candidate-list">
//                     {clients.map(client => (
//                       <li key={client._id} className="candidate-list-box card mt-4">
//                         <div className="ther-card p-4 card-body">
//                           <div className="align-items-center row">
//                             <div className="col-auto">
//                               <div className="candidate-list-images">
//                                 <a href="/">
//                                   <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-md img-thumbnail rounded-circle" />
//                                 </a>
//                               </div>
//                             </div>
//                             <div className="col-lg-5">
//                               <div className="candidate-list-content mt-3 mt-lg-0">
//                                 <h3 className="fs-19 mb-0">
//                                   <a className="text-username primary-link" href="/">{client.name}</a>
//                                 </h3>
//                                 <p className="text-username ">{client.email}</p>
//                               </div>
//                             </div>
//                           </div>
//                           <div>
//                             <button className='btn btn-addclient' onClick={() => handleViewClient(client)}>View</button>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}
//             {selectedClient && (
//               <div className="client-details mt-4">
//                 <h3>Client Details</h3>
//                 <p><strong>Name:</strong> {selectedClient.name}</p>
//                 <p><strong>Email:</strong> {selectedClient.email}</p>
//                 <p><strong>Phone:</strong> {selectedClient.phone}</p>
//                 <p><strong>Address:</strong> {selectedClient.address}</p>
//                 {/* Add more client details as needed */}
//               </div>
//             )}
//             {message && <p>{message}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withAuth(Patients);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar2 from '../components/Sidebar2';
import { useSelector } from 'react-redux';
import '../styles/therapist.css';
import withAuth from '../utils/withAuth';

function Patients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const username = useSelector(state => state.username);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const response = await axios.get('http://localhost:8000/getusers'); // Adjust the endpoint as needed
      setClients(response.data);
      setLoading(false);
    } catch (error) {
      setMessage('Error fetching clients');
      console.error('Error fetching clients:', error);
    }
  }

  // Navigate to patient details when View button is clicked
  const handleViewClient = (clientId) => {
    navigate(`/patients/${clientId}`); // Navigate to PatientDetails page with clientId
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar2 />
        </div>
        <div className="col-md-9">
          <div className="dropdown-therapist">
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
          <h2 className='Articles-heading'>Clients</h2>
          <div className='desc-profile'>Here you can view all clients.</div>

          <div className="container-fluid">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div>
                  <ul className="candidate-list">
                    {clients.map(client => (
                      <li key={client._id} className="candidate-list-box card mt-4">
                        <div className="ther-card p-4 card-body">
                          <div className="align-items-center row">
                            <div className="col-auto">
                              <div className="candidate-list-images">
                                <a href="/">
                                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-md img-thumbnail rounded-circle" />
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-5">
                              <div className="candidate-list-content mt-3 mt-lg-0">
                                <h3 className="fs-19 mb-0">
                                  <a className="text-username primary-link" href="/">{client.name}</a>
                                </h3>
                                <p className="text-username ">{client.email}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button className='btn btn-addclient' onClick={() => handleViewClient(client._id)}>View</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Patients);
