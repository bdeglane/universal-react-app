import React, {Component} from 'react';

import './header.scss';

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="grid-block shrink header">
        <div className="grid-block shrink">
          <div className="logo">
            Brand Logo
          </div>
        </div>
        <div className="grid-block"></div>
      </header>
    )
  }
}