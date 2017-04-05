import { connect } from 'react-redux';
import SidebarNav from './SidebarNav.jsx';

const mapStateToProps = state => ({
  menu: state.menu.open
});

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

export default connect(mapStateToProps, null)(SidebarNav);
