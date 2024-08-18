import '../Styles/App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Footer from './footer';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import Groups from './Groups';
import Logout from './Logout';
import Profile from './Profile';
import { Navigate } from 'react-router-dom';


export default function App() {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('access_token')) {
            setUser(localStorage.getItem('uid'));
            setAuth(true);
        }
    }
    , []);

    const router = (
        <Router>
            <Header user={user}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={user !== null ? <Navigate to='/'/>:<Login onLogin={setUser} user={user} setAuth={setAuth} auth={auth}/>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={user === null ? <Navigate to='/login'/> : <Profile user={user}/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/groups" element={<Groups user={user}/>} />
            </Routes>
            <Footer/>
        </Router>
    );

    return (
    <div className="App">
        {router}
    </div>
  );
}


