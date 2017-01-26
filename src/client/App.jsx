import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import Store from './core/Store';
import Routes from './route/Routes.jsx';

export default class App extends Component {
  constructor() {
    super();
    // Add the reducer to your store on the `routing` key
    this.store = new Store();
    // Create an enhanced history that syncs navigation events with the store
    this.history = syncHistoryWithStore(browserHistory, this.store.getStore());
  }

  render() {
    return (
      <Provider store={this.store.getStore()}>
        <Routes history={this.history}/>
      </Provider>
    )
  }
}