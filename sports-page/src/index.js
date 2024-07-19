import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Link, Route} from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Groups from './components/Groups';
import Footer from './components/footer';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div><App/></div>,
    },
    {
        path: '/about',
        element: <><Header/><About/><Footer/></>,
    },
    {
        path: '/groups',
        element: <><Header/><Groups/><Footer/></>,
    }
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
