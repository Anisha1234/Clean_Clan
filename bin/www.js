const http = require('http');
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
const bodyParser = require('body-parser');
=======
>>>>>>> 316f811... Finish user services, lint react-views
/**
 * @function - set up server
 * @param {Express} app - express app
 * @param {number} port - port for server to listen 
 */
module.exports = (app, port)=>{
  //create a http server (here we could set up a https server if needed)
  const server = http.createServer(app);
  server.listen(port, ()=>{
    console.log("Server is online on port ", port);
  });
}
>>>>>>> 8664d7c... set up fileHandler service and create user service
