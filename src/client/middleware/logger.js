export const logger = (store) => {
  return (next) => {
    return (action) => {
      console.group(action.type);
      console.info('dispatching', action);
      // store dispatch
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd(action.type);
      return result;
    };
  };
};
