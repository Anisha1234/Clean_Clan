const http = require('http');
/**
 * @function - set up server
 * @param {Express} app - express app
 * @param {number} port - port for server to listen
 */
module.exports = (app, port) => {
  // create a http server (here we could set up a https server if needed)
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log('Server is online on port ', port);
  });
};
