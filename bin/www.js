const http = require('http');
const bodyParser = require('body-parser');
/**
 * @function - set up server
 * @param {Express} app - express app
 * @param {string||number} port - port for server to listen 
 */
module.exports = (app, port)=>{
  //set up body parser for the express app
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  //create a http server (here we could set up a https server if needed)
  const server = http.createServer(app);
  server.listen(port, ()=>{
    console.log("Server is online on port ", port);
  });
}