import path from 'path';
import {Server} from 'http';
import Express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import {match, RouterContext, Router} from 'react-router';
import {Provider} from 'react-redux';
import routes from './client/route/route';
import Store from './client/core/Store';

import {renderFullPage} from './client/common/renderHtmlDocument';

import NotFoundPage from './client/page/notFound/NotFoundPage.jsx';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'view'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res, next) => {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {


      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (renderProps == null) {
        // return next('err msg: route not found'); // yield control to next middleware to handle the request
        return res.status(404).send('Not found');
      }

      let store = new Store();
      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<Provider store={store.getStore()}><RouterContext {...renderProps}/></Provider>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      // return res.render('index', {markup});
      return res.status(200).send(renderFullPage(markup, {tata: 'toto'}));
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});