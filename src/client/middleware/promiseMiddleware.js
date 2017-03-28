/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 *
 * see http://redux.js.org/docs/advanced/Middleware.html
 */
export const readyStatePromise = (store) => {
  return (next) => {
    return (action) => {

      // check if action have a promise field
      // { type:'ACTION', text:'an action', promise:() => { return new Promise(); }, ... }
      const {promise} = action;
      // if action is not a promise, next...
      if (!promise) {
        return next(action)
      }
      //
      function makeAction(ready, data) {
        // copy action into new object
        let newAction = Object.assign({}, action, {ready}, data);
        // delete promise key for next tick
        delete newAction.promise;
        // return action
        return newAction;
      }

      // if promise is resolved, next...
      next(makeAction(false));
      // push action in queue by returning
      // an action with pending promise
      return action.promise().then(
        // then resolved, next
        result => next(makeAction(true, {result})),
        error => next(makeAction(true, {error}))
      );
    };
  };
};