import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from '../middleware/logger';
import { crashReporter } from '../middleware/crashReporter';
import {
  initialState,
  saveState
} from '../middleware/state';
import {
  vanillaPromise
} from '../middleware/promiseMiddleware';
import reducers from '../reducer/index';

export default class Store {
  constructor () {
    // Add the reducer to your store on the `routing` key
    this.store = createStore(
      reducers,
      initialState(),
      this.getCompose(
        applyMiddleware(
          thunk,
          vanillaPromise,
          logger,
          crashReporter
        )
      )
    );
    // Store state in local storage
    this.store.subscribe(() => {
      saveState(this.store.getState());
    });
  }

  getStore () {
    return this.store;
  }

  getCompose (middlewares) {
    let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(middlewares);
  }
}
