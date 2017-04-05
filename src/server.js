import path from 'path';
import { Server } from 'http';
import Express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import FileStreamRotator from 'file-stream-rotator';

import React from 'react';
import { renderToString } from 'react-dom/server';

import {
  applyMiddleware,
  createStore
} from 'redux';
import {
  match,
  RouterContext,
  Router
} from 'react-router';
import { Provider } from 'react-redux';
import routes from './client/route/route';
import reducers from './client/reducer/index';

import { renderFullPage } from './client/common/renderHtmlDocument';

import NotFoundPage from './client/page/notFound/NotFoundPage.jsx';
// import { fetchComponentData } from './client/common/fetchComponentData';
import {
  promiseMiddleware,
//   vanillaPromise,
//   readyStatePromise
} from './client/middleware/promiseMiddleware';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

// wait for all promise to resolve before updating state
const finalCreateStore = applyMiddleware(
  // vanillaPromise,
  // readyStatePromise,
  promiseMiddleware
)(createStore);

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// log
let logDirectory = path.resolve(path.join('log'));
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: logDirectory + '/api-access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});
app.use(morgan('[:date[clf]] [:req[x-forwarded-for]] [:req[x-forwarded-server]] :remote-user ":method :url"  :status :response-time ms :res[content-length] ":user-agent"', {stream: accessLogStream}));

// universal routing and rendering
app.get('*', (req, res, next) => {
  match(
    {routes, location: req.url},
    (err, redirectLocation, renderProps) => {
      const store = finalCreateStore(reducers);
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
        let page = renderToString(<NotFoundPage/>);
        return res.status(404).send(renderFullPage(page, {}));
      }

      // let store = new Store();
      // generate the React markup for the current route

      // this is where universal rendering happens,
      // fetchComponentData() will trigger actions listed in static "needs" props in each container component
      // and wait for all of them to complete before continuing rendering the page,
      // hence ensuring all data needed was fetched before proceeding
      //
      // renderProps: contains all necessary data, e.g: routes, router, history, components...
      // fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      // .then(() => {
      const initView = renderToString((
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ));
      // console.log('\ninitView:\n', initView);
      let state = JSON.stringify(store.getState());
      // console.log( '\nstate: ', state )
      let page = renderFullPage(initView, state);
      // console.log( '\npage:\n', page );
      // return page;

      res.status(200).send(page);

      //     })
      //     .then(page => res.status(200).send(page))
      //     .catch(err => res.end(err.message));
    });
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
