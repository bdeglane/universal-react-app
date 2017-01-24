import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './client/route/Routes.jsx';

window.onload = () => {
  ReactDOM.render(
    <Routes/>,
    document.getElementById('main')
  );
};