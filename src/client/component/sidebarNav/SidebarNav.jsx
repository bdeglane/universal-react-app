import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import './sidebarNav.scss';

export default class SidebarNav extends Component {
  constructor() {
    super();
  }

  render() {

    let classes = classnames('sidebar', 'nav shrink',
      {
        open: this.props.menu
      });

    return (
      <div className={classes}>
        <nav className="grid-block ">

        </nav>
      </div>
    )
  }
}

SidebarNav.propTypes = {
  menu: PropTypes.bool.isRequired
};