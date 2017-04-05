// const debug = require('debug')('fetch');

// for use on server to guarantee data was fetched before rendering pages for user
export const fetchComponentData = (dispatch, components, params) => {
  // debug(dispatch);
  // debug(components);
  // debug(params);
  return new Promise((resolve, reject) => {
    resolve();
  });
  /*
   const needs = components.reduce((prev, current) => {

   return Object.keys(current).reduce((acc, key) => {
   return current[key].hasOwnProperty('needs') ? current[key].needs.concat(acc) : acc
   }, prev)

   }, []);

   const promises = needs.map(need => dispatch(need(params)));

   return Promise.all(promises);
   */
};
