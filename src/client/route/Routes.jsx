import React, {Component} from 'react';
import {Router} from 'react-router';
import routes from './route';

export default class Routes extends Component {
  render() {
    return (
      <Router history={this.props.history}
              routes={routes}
              onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}