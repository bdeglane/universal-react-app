import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';

import reducers from '../reducer/index';

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.group(action.type);
      console.info('dispatching', action);
      // store dispatch
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd(action.type);
      return result
    };
  };
};

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err);
    //Raven.captureException(err, {
    //    extra: {
    //        action,
    //        state: store.getState()
    //    }
    //});
    throw err
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return 'undefined';
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return 'undefined';
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    // ignore errors
  }
};

const initialState = () => {
  let state = loadState();
  if (state === 'undefined') {
    return {}
  } else {
    return state;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class Store {
  constructor() {
    // Add the reducer to your store on the `routing` key
    this.store = createStore(
      reducers,
      initialState(),
      composeEnhancers(
        applyMiddleware(
          thunk,
          logger,
          // crashReporter
        )
      )
    );
    // Store state in local storage
    this.store.subscribe(() => {
      saveState(this.store.getState());
    });
  }

  /**
   *
   *
   * @returns {Store<S>|*}
   */
  getStore() {
    return this.store;
  }
}