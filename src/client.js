import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './client/route/route';

window.onload = () => {
  ReactDOM.render(
    <routes/>,
    document.getElementById('main')
  );
};