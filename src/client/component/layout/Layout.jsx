import React, {Component} from 'react';
import './layout.scss';

export default class Layout extends Component {
  render() {
    return (
      <div className="app-root">
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}