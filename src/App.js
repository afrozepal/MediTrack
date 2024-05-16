import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Article1 from './components/Article1';
import Article2 from './components/Article2';
import Article3 from './components/Article3';
import Article4 from './components/Article4';
import Article5 from './components/Article5';
import Article6 from './components/Article6';
import Article7 from './components/Article7';
import ForgotPassword from './components/ForgotPassword';

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
                    <Route path="/article1" element={<Article1 />} />
                    <Route path="/article2" element={<Article2 />} />
                    <Route path="/article3" element={<Article3 />} />
                    <Route path="/article4" element={<Article4 />} />
                    <Route path="/article5" element={<Article5 />} />
                    <Route path="/article6" element={<Article6 />} />
                    <Route path="/article7" element={<Article7 />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;








// // App.js
// import React from 'react'
// import { useState } from 'react';
// import HomePage from './components/HomePage';
// import Login from './components/Login';
// import SignUp from './components/SignUp';

// const App = () => {
//     const [loginVisible, setLoginVisible] = useState(false);
//     const [signUpVisible, setSignUpVisible] = useState(false);

//     return (
//         <div className="App">
//             {loginVisible && <Login setLoginVisible={setLoginVisible} />}
//             {signUpVisible && <SignUp setSignUpVisible={setSignUpVisible} />}
//             {!loginVisible && !signUpVisible && (
//                 <HomePage
//                     setLoginVisible={setLoginVisible}
//                     setSignUpVisible={setSignUpVisible}
//                 />
//             )}
//         </div>
//     );
// };

// export default App;