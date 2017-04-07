export const crashReporter = () => {
  return next => {
    return action => {
      try {
        return next(action);
      } catch (err) {
        console.error('Caught an exception!', err);

        // todo ajax call with axios to log id db error

        // Raven.captureException(err, {
        //    extra: {
        //        action,
        //        state: store.getState()
        //    }
        // });
        throw err;
      }
    };
  };
};
