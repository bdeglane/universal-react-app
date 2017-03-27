import React, {Component} from 'react';
import Header from '../header/index';
import SidebarNav from  '../sidebarNav/index';

import './layout.css';

export default class Layout extends Component {
  render() {
    return (
      <div className="app-root grid-frame">
        <div className="grid-block vertical">
          <Header/>
          <div className="grid-block">
            <SidebarNav/>
            <div className="app-content grid-block">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}