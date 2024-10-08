import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Make sure to import your Sidebar component
import '../styles/Profile.css'
import { Link } from 'react-router-dom';
import searchIcon from '../assets/icons8-search-100.png';
import withAuth from '../utils/withAuth';
import { useSelector } from 'react-redux';


function Profile(props) {
    const username = useSelector(state => state.username);
    const [ArticleSchema, setArticleSchema] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = props;
    // const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/getarticles')
            .then(ArticleSchema => setArticleSchema(ArticleSchema.data))
            .catch(err => console.log(err))
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/userprofile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // setUserProfile(response.data);
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };

    fetchUserProfile();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredArticles = ArticleSchema.filter(article => {
        return article.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
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
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        <br />
                        <h2 className='Articles-heading'>Articles</h2>
                        <div className='desc-profile'>Here you can read different articles according to your mood and prefernces.</div>
                        {/* My articles start here */}
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {filteredArticles.map(art => (
                                <div className="col" key={art._id}>
                                    <div className="card shadow-sm">
                                        <div className="card-design">
                                            <img
                                                src={art.image} // Placeholder image URL or your actual image URL
                                                alt="Thumbnail"
                                                className="card-img-top"
                                                style={{ width: '100%', height: '225px', objectFit: 'cover' }} // Set width, height, and object-fit for styling
                                            />
                                        </div>
                                        <div className="card-body">
                                            <p className='card-text-heading'>{art.title}</p>
                                            <p className="card-text">{art.tagline}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <Link to={`/article/${art._id}`} type="button" className="btn btn-sm" onClick={() => console.log('Link to article1 clicked')}>View</Link>
                                                </div>
                                                <small className="text-body-secondary1">{art.publishDate}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withAuth(Profile);
