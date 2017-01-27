import React, {Component} from 'react';

import PageTemplate from '../../component/template/page/PageTemplate.jsx';

export default class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <PageTemplate>
        <h1>Home page</h1>
      </PageTemplate>
    )
  }
}