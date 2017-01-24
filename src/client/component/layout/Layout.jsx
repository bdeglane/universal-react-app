import React, {Component} from 'react';

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