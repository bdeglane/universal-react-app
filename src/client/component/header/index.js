import {connect} from 'react-redux';
import Header from './Header.jsx';
import {toggleMenu} from '../../action/menu';

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu: () => dispatch(toggleMenu())
  };
};

export default connect(null, mapDispatchToProps)(Header)