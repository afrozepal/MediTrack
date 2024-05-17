import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import { Login } from './components/Login';
import SignUp from './components/SignUp';
import Reporting from '../src/components/Reports';
import Profile from './components/Profile';
import Article from './components/Article1';
import ForgotPassword from './components/ForgotPassword';
import ChatInterface from './components/Therapist';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/forgotpass" element={<ForgotPassword />} />
                    <Route path="/reports" element={<Reporting />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/therapist" element={<ChatInterface />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
