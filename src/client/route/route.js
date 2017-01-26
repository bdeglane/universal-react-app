import React from 'react';
import {Route, IndexRoute} from 'react-router';
import NotFoundPage from '../page/notFound/NotFoundPage.jsx';
import Home from '../page/home/Home.jsx';
import Layout from '../component/layout/Layout.jsx';

const routes = (
  <Route path="/"
         component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;