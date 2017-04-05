import { connect } from 'react-redux';
import Header from './Header.jsx';
import {
  toggleMenu,
  examplePromiseAction
} from '../../action/menu';

// const mapStateToProps = (state) => {
//   return {};
// };

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu()),
  asyncTest: () => dispatch(examplePromiseAction())
});

export default connect(null, mapDispatchToProps)(Header);
