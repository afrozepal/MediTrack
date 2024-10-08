import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Reporting from '../src/components/Reports';
import Profile from './components/Profile';
import Article from './components/Article1';
import ForgotPassword from './components/ForgotPassword';
import TherapistProfile from '../src/components/Therapist'
import Addhw from '../src/components/addhwt';
import Homework from '../src/components/Homework'
import UsersList from './components/addclients';
import Diary from './components/Diary';
import Playlist from './components/Playlist';
import Chatbot from './components/Chatbot';
import Profile2 from './components/MyProfile';
import TherapistClients from '../src/components/clientcounts';
import Therapist from '../src/components/addtherapist';
import DisplayAnswers from '../src/components/check';
import Appointment from './Pages/Appointment';
import History from './Pages/History';
import Admin from "./components/Admin";
import Patients from "../src/Pages/showpatients";
import Doctors from "../src/Pages/showdoctors";
import PatientDetails from "../src/Pages/showpatientdetails";
import DoctorDetails from "../src/Pages/doctordetails";


const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/forgotpass" element={<ForgotPassword />} />
                    <Route path="/reports" element={<Reporting />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/therapist" element={<TherapistProfile />} />
                    <Route path="/addhwt/:userId" element={< Addhw />} />
                    <Route path="/check/:userId" element={< DisplayAnswers />} />
                    <Route path="/homework" element={< Homework />} />
                    <Route path="/addclient" element={< UsersList />} />
                    <Route path="/diary" element={< Diary />} />
                    <Route path="/playlist" element={< Playlist />} />
                    <Route path="/assistant" element={< Chatbot />} />
                    <Route path="/myprofile" element={< Profile2 />} />
                    <Route path="/client-count" element={< TherapistClients />} />
                    <Route path="/add-therapist" element={< Therapist />} />
                    <Route path="/appointment-history" element={< History />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/patients/:userId" element={<PatientDetails />} />
                      <Route path="/doctors" element={<Doctors />} />
                      <Route path="/doctors/:doctorId" element={<DoctorDetails />} />
                </Routes>
            </div>
        </Router>
    );