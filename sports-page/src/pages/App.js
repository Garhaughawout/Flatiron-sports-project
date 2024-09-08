import '../Styles/App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Header from './Basics/Header';
import Home from './Home/Home';
import Footer from './Basics/footer';
import About from './About/About';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Groups from './Groups/Groups';
import Profile from './Profile/Profile';
import GroupPage from './Groups/Grouppage';
import { Navigate } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";


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

    const theme = createTheme({
        palette: {
            primary: {
                main: "#2e3944",
                light: "rgb(95, 95, 95)",
                dark: "rgb(95, 95, 95)",
            }
        },
    })

    const router = (
        <Router>
            <Header user={user}/>
            <Routes>
                <Route path="/" element={<Home theme={theme}/>} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={user !== null ? <Navigate to='/'/> : <Login onLogin={setUser} user={user} setAuth={setAuth} auth={auth}/>} />
                <Route path="/profile" element={user === null ? <Navigate to='/login'/> : <Profile user={user} theme={theme}/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/groups" element={<Groups user={user} theme={theme}/>} />
                <Route path="/group/:id" element={<GroupPage user={user}/>} />
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


