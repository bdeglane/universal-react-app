import React from 'react';
import {Router, browserHistory} from 'react-router';
import Routes from './client/route/Routes.jsx';

window.onload = () => {
  ReactDOM.render(
    <Routes/>,
    document.getElementById('main')
  );
};