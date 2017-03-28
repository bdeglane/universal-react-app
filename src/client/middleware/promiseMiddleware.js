// Promise middleware for redux as explain in redux doc
// see http://redux.js.org/docs/advanced/Middleware.html
export const promiseMiddleware = (objMethods) => {
  return (next) => {
    return (action) => {

      const {promise, types, ...rest} = action;

      // 假如傳來的 action 內沒有 promise 屬性，代表不需 async 處理，直接略過
      if (!promise) {
        // console.log( 'promiseMiddleware > 沒 promise > 不處理，且接丟給後手' );
        return next(action);
      }

      // 這裏聰明的將外界傳入的變數，透過 destructuring 轉為常數
      // 因此 middleware 可適用於各種不同情境
      const [REQUEST, SUCCESS, ERROR] = types;

      // console.log( '建立 Const: ', REQUEST, SUCCESS, ERROR );

      // 進行第一次的廣播，讓畫面立即更新，也就是 optimistic update
      next({...rest, type: REQUEST});

      // 然後偵聽 WebAPI promise 操作結束，發出第二次廣播
      // 這次 type 改為 SUCCESS，因此 store 內知道要依 tid 更新 uid
      return promise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: ERROR})
      );
    };
  };
};

/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
export const vanillaPromise = store => next => action => {
  // if action have a promise key
  if (!action.promise) {
    return next(action)
  }
  // wait for the promise to resolve
  // before calling next action
  return Promise
    .resolve(action.promise())
    .then(store.dispatch);
};

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
      return action.promise.then(
        // then resolved, next
        result => next(makeAction(true, {result})),
        error => next(makeAction(true, {error}))
      );
    };
  };
};