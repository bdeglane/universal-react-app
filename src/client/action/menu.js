import {TOGGLE_MENU} from '../constant/menu';

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU,
    text: 'toggle menu'
  }
};