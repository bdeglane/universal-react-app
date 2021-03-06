import React, { Component } from 'react';

import './pageTemplate.css';

export default class PageTemplate extends Component {

  render() {
    return (
      <div className="grid-block page">
        <div className="grid-content page-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}