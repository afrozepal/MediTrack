import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/ChatInterface.css'; // Import your CSS file for ChatInterface styling

function ChatInterface({ currentUser, recipientUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Poll for new messages every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/api/messages', {
                params: {
                    sender: currentUser._id,
                    receiver: recipientUser._id
                }
            });
            setMessages(response.data);
            if (response.data.some(message => message.receiver === currentUser._id && !message.read)) {
                setNotification(true); // Set notification if there are unread messages
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post('/api/messages', {
                sender: currentUser._id,
                receiver: recipientUser._id,
                content: newMessage
            });
            setNewMessage('');
            fetchMessages(); // Refresh messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="container-fluid chat-container">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9 chat-section">
                    <div className="message-list">
                        {messages.map(message => (
                            <div key={message._id} className={`message ${message.sender === currentUser._id ? 'sent' : 'received'}`}>
                                <div className="content">{message.content}</div>
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
            {notification && (
                <div className="notification">
                    You have new messages!
                </div>
            )}
        </div>
    );
}

export default ChatInterface;
