const cors = require('cors');
/**
 * @function: set up cors middleware - important for session setup
 * @param {Express} app: Express server
 */
module.exports = (app) => {
  app.use(cors({
    origin: ['http://localhost:5000'], // the client dev domain
    credentials: true, // this is for session set up
    methods: 'GET,HEAD,OPTIONS,POST,PUT',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }));
};
