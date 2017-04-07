import { TOGGLE_MENU } from '../constant/menu';

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU,
    text: 'toggle menu'
  };
};

// export const examplePromiseAction = () => {
//  return {
//    type: 'EXAMPLE_ASYNC',
//    text: 'An example async promise action',
//    promise: WebAPIUtils.getAll()
//  }
// }

export const examplePromiseAction = () => {
  return {
    type: 'EXAMPLE_ASYNC',
    text: 'An example async promise action',
    promise: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(toggleMenu());
        }, 5000);
      });
    }
  };
};
