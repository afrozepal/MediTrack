import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';

const Chatbot = () => {
    const username = useSelector(state => state.username);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        try {
            const newMessage = { text: message, fromUser: true };
            setMessages(prevMessages => [...prevMessages, newMessage]);

            const res = await axios.post('http://localhost:5000/chatbot', { message });

            setMessages(prevMessages => [...prevMessages, { text: res.data.response, fromUser: false }]);

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="dropdown-chatbot">
                            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <p className='username-text'>Welcome {username}</p> {/* Display the username here */}
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="/myprofile">My Profile</a></li>
                                {/* <li><a className="dropdown-item" href="/">Settings</a></li> */}
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        <br />
                        <h2 className='Articles-heading'>AI CHATBOT</h2>
                        <div className='desc-profile'>You can chat about your emotions with our friednly chatbot.</div>
                        <div className="chat-container">
                            <div className="chat-messages">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.fromUser ? 'sent' : 'received'}`}>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                />
                                <button className="btn btn-custom-chatbot" onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Chatbot;