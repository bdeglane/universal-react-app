import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {logger} from './helper/logger';
import {crashReporter} from './helper/crashReporter';
import {
  initialState,
  saveState
} from './helper/state';
import reducers from '../reducer/index';

export default class Store {
  constructor() {
    // Add the reducer to your store on the `routing` key
    this.store = createStore(
      reducers,
      initialState(),
      this.getCompose(
        applyMiddleware(
          thunk,
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

  getStore() {
    return this.store;
  }

  getCompose(middlewares) {
    let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(middlewares);
  }
}