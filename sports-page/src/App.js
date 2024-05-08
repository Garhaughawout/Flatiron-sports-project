import './Styles/App.css';
import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';



export default function App() {
  
  
  
    return (
    <div className="App">
        <Header/>
        <Home/>
    </div>
  );
}


