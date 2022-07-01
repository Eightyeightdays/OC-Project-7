import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";

import Home from './pages/home';
import App from './app';
import DisplaySinglePost from './pages/displaySinglePost';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route path="home" element={<Home />}/>
        <Route path="post/:postId" element={<DisplaySinglePost />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

