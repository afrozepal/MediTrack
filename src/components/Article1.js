import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import searchIcon from '../assets/icons8-search-100.png';
import withAuth from '../utils/withAuth';
import '../styles/articles.css';

const Article = () => {
    const { id } = useParams();  // Correctly extract the id from the URL parameters
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getarticle/${id}`);
                setArticle(response.data);
                console.log('hey i am working!!');
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }
    const username = localStorage.getItem('username');
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
                            <p>Welcome {username}</p> {/* Display the username here */}
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="/">My Profile</a></li>
                                <li><a className="dropdown-item" href="/">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        <br />
                        <h1 className="article display-4 fst-italic">{article.title}</h1>
                        <div className="image-container p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
                            <img src={article.image} alt="Article Img" className="article-image" />
                        </div>
                        <h1 className="article-subheadings">{article.title}</h1>

                        <p className="article-body">{article.content}</p>

                        {/* Display other properties like author name and publish date */}
                        <div className="article-details">
                            <p className='article-subheadings'>Author: {article.author}</p>
                            <p className='article-subheadings'>Publish Date: {article.publishDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withAuth(Article);
