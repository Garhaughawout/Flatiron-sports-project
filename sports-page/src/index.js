import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Link, Route} from 'react-router-dom';
import Header from './Header';
import About from './About';



const router = createBrowserRouter([
    {
        path: '/',
        element: <div><App/></div>,
    },
    {
        path: '/about',
        element: <><Header/><About/></>,
    },
]); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
