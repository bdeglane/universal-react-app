import { TOGGLE_MENU } from '../constant/menu';

export const getDefaultState = () => {
  return {
    open: false
  };
};

export const menu = (state = getDefaultState(), action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      state = Object.assign({}, state, {
        open: !state.open
      });
      break;

    default:
      break;
  }
  return state;
};
