import React, { useState } from 'react';
import home from '../assets/icons8-home-24.png'
import doc from '../assets/icons8-stethoscope-24.png'
import rep from '../assets/icons8-graph-24.png'
import music from '../assets/icons8-music-24.png'
import hw from '../assets/icons8-study-24.png'
import diary from '../assets/icons8-diary-90.png'
import article from '../assets/icons8-article-24.png'
import logo from '../assets/blue-logo.png'
import chat from '../assets/icons8-chat-24.png'
import '../styles/Sidebar.css';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('home'); // Initial active item

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <>
            <main className="d-flex flex-nowrap">
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '280px', position: 'fixed' }}>
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <img src={logo} alt="Logo" width="40" height="40" className=" d-inline-block align-text-top" />
                        <span className="sidebar-heading">MindMate</span>
                    </a>
                    <hr className='line' />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 rounded ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={home} alt="" />
                                <span className='option-color ms-2 d-sm-inline'>Home</span>
                            </a>
                        </li>
                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={article} alt="" />
                                <span className='option-color ms-2 d-sm-inline'>Articles</span>
                            </a>
                        </li>
                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={diary} alt="" />
                                <span className='ms-2 d-sm-inline'>Diary
                                </span>
                            </a>
                        </li>
                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={hw} alt="" />
                                <span className='ms-2 d-sm-inline'>Homework</span>
                            </a>
                        </li>
                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={rep} alt="" />
                                <span className='ms-2 d-sm-inline'>Reports</span>
                            </a>
                        </li>
                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={music} alt="" />
                                <span className='ms-2 d-sm-inline'>Playlists</span>
                            </a>
                        </li>
                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={doc} alt="" />
                                <span className='ms-2 d-sm-inline'>Therapist</span>
                            </a>
                        </li>

                        <li className={`nav-item text-white fs-6 my-1 py-2 py-sm-0 ${activeItem === 'home' ? 'active' : ''}`}>
                            <a href="/" className='Assistant-design nav-link text-black fs-6' aria-current="page" onClick={() => handleItemClick('home')}>
                                <img className='style-image-home' src={chat} alt="" />
                                <span className='Assistant-design ms-2 d-sm-inline'>Assistant</span>
                            </a>
                        </li>

                    </ul>
                    {/* <hr />
                    <div className="dropdown">
                        <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>mdo</strong>
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            <li><a className="dropdown-item" href="/">New project...</a></li>
                            <li><a className="dropdown-item" href="/">Settings</a></li>
                            <li><a className="dropdown-item" href="/">Profile</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/">Sign out</a></li>
                        </ul>
                    </div> */}
                </div>
            </main >
        </>
    );
};

export default Sidebar;
