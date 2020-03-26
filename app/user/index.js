const UserService = require('./services');
const UserRouteInit = require('./routes');

module.exports = () => ({
  UserService,
  UserRoute: UserRouteInit()
});