import '../Styles/App.css';
import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Footer from './footer';


export default function App() {
  
  
  
    return (
    <div className="App">
        <Header/>
        <Home/>
        <Footer/>
    </div>
  );
}


