import React, {Component, PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';

import './header.css';

export default class Header extends Component {
  constructor() {
    super();
  }

  toggleMenu() {
    this.props.toggleMenu();
  }

  render() {
    return (
      <header className="grid-block shrink header">
        <div className="grid-block shrink menu"
             onClick={() => this.toggleMenu()}>
          <FontAwesome name="bars"/>
        </div>
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

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};