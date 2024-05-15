// Profile.js - it may seem profile but this is the Articles page 
import React from 'react';
import Sidebar from './Sidebar'; // Make sure to import your Sidebar component
import '../styles/Profile.css'
import { Link } from 'react-router-dom';
import searchIcon from '../assets/icons8-search-100.png'
import img1 from '../assets/orange.jpg'
import img2 from '../assets/med.jpg'
import img3 from '../assets/3.jpg'
import img4 from '../assets/4.jpg'
import img5 from '../assets/5.jpg'
import img6 from '../assets/6.jpg'
import img7 from '../assets/7.jpg'

const Profile = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="search-bar d-flex justify-content-center align-items-center">
                            <input type="text" className="form-control search-input" placeholder="Search..." />
                            <button className="btndesign btn btn-outline-secondary" type="button">
                                <img src={searchIcon} alt="Search" width="20" height="20" />
                            </button>
                        </div>
                        <div className="dropdown">
                            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="/">My Profile</a></li>
                                <li><a className="dropdown-item" href="/">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        <br />
                        <h2 className='Articles-heading'>Articles</h2>

                        {/* My articles start here */}
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            <div className="col">
                                <div className="card shadow-sm">
                                    <div className="card-design">
                                        <img
                                            src={img1} // Placeholder image URL or your actual image URL
                                            alt="Thumbnail"
                                            className="card-img-top"
                                            style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                        />
                                    </div>

                                    <div className="card-body">
                                        <p className='card-text-heading'>Anxiety: Symptoms, Triggers & Coping</p>
                                        <p className="card-text">Empowering you with knowledge and strategies to manage anxiety and lead a fulfilling life.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to="/article1" type="button" className="btn btn-sm" onClick={() => console.log('Link to article1 clicked')}>View</Link>
                                                {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                                            </div>
                                            <small className="text-body-secondary1">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card shadow-sm">
                                    <img
                                        src={img2} // Placeholder image URL or your actual image URL
                                        alt="Thumbnail"
                                        className="card-img-top"
                                        style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                    />
                                    <div className="card-body">
                                        <p className='card-text-heading'>Breaking the Depression Stigma</p>
                                        <p className="card-text">Join us in breaking the silence on depression, promoting open conversations, and encouraging seeking professional support.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to="/article2" type="button" className="btn btn-sm " onClick={() => console.log('Link to article1 clicked')}>View</Link>
                                                {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                                            </div>
                                            <small className="text-body-secondary1">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card shadow-sm">
                                    <img
                                        src={img3} // Placeholder image URL or your actual image URL
                                        alt="Thumbnail"
                                        className="card-img-top"
                                        style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                    />
                                    <div className="card-body">
                                        <p className='card-text-heading'>Mindfulness for Mental Wellness</p>
                                        <p className="card-text">Explore the power of mindfulness and self-care practices in nurturing mental wellness and resilience.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to="/article3" type="button" className="btn btn-sm ">View</Link>
                                            </div>
                                            <small className="text-body-secondary1">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card shadow-sm">
                                    <img
                                        src={img4} // Placeholder image URL or your actual image URL
                                        alt="Thumbnail"
                                        className="card-img-top"
                                        style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                    />
                                    <div className="card-body">
                                        <p className='card-text-heading'>Overcoming PTSD: Healing & Resilience</p>
                                        <p className="card-text">Providing insights and resources for overcoming PTSD, healing from trauma, and building inner strength.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to="/article4" type="button" className="btn btn-sm">View</Link>
                                                {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                                            </div>
                                            <small className="text-body-secondary1">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card shadow-sm">
                                    <img
                                        src={img5} // Placeholder image URL or your actual image URL
                                        alt="Thumbnail"
                                        className="card-img-top"
                                        style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                    />
                                    <div className="card-body">
                                        <p className='card-text-heading'>Communication Tips for Mental Health</p>
                                        <p className="card-text">Discover effective communication strategies for fostering healthy relationships and improving your mental well-being.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to="/article5" type="button" className="btn btn-sm">View</Link>
                                                {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                                            </div>
                                            <small className="text-body-secondary1">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card shadow-sm">
                                    <img
                                        src={img6} // Placeholder image URL or your actual image URL
                                        alt="Thumbnail"
                                        className="card-img-top"
                                        style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                    />
                                    <div className="card-body">
                                        <p className='card-text-heading'>Power of Positivity: Optimism & Mental Health</p>
                                        <p className="card-text">Exploring the impact of positivity and optimism on mental health, with practical tips for a more positive mindset.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to="/article6" type="button" className="btn btn-sm ">View</Link>
                                                {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                                            </div>
                                            <small className="text-body-secondary1">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card shadow-sm">
                                    <img
                                        src={img7} // Placeholder image URL or your actual image URL
                                        alt="Thumbnail"
                                        className="card-img-top"
                                        style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                    />
                                    <div className="card-body">
                                        <p className='card-text-heading'>Coping with Change: Mental Wellness</p>
                                        <p className="card-text">Empowering you to navigate life transitions with resilience and maintain mental wellness during times of change.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to="/article7" type="button" className="btn btn-sm">View</Link>
                                                {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                                            </div>
                                            <small className="text-body-secondary1">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
