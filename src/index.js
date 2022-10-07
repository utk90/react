import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import App from './App';
import Posts from './Components/Posts/Posts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<Posts />} />
      </Switch>
    </BrowserRouter>,
  </React.StrictMode>
);