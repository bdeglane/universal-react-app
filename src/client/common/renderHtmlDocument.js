export const renderFullPage = (html, initialState) => (
  `
   <!doctype html>
   <html lang="utf-8">
   <head>
     <meta charset="utf-8"/>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>First Universal App</title>
     <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
           rel="stylesheet"
           integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
           crossorigin="anonymous">
     <link rel="stylesheet" href="style/main.css">
   </head>
   <body>
     <div id="main">${html}</div>
   <script>
     const state = JSON.parse(${JSON.stringify(initialState)});
     const saveState = (state) => {
       try {
         const serializedState = JSON.stringify(state);
         localStorage.setItem('state', serializedState);
       } catch (error) {
         // ignore errors
       }
     };
     saveState(state);
   </script>
   <script src="js/vendor.js"></script>
   <script src="js/main.js"></script>
   </body>
  </html>
  `
);
