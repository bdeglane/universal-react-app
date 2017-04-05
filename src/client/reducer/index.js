import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { menu } from './menu';

/**
 * Combine all the reducers in a constant and export it.
 * This constant will be given to the redux store
 */
const reducers = combineReducers({
  routing: routerReducer,
  menu
});

export default reducers;
