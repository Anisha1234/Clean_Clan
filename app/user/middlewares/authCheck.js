/**
 * @function: middleware to check whether user is logged in
 * it check the session object: req.session
 */
module.exports = (req, res, next)=>{
  if(req.session && req.session.email){
    next();
    return;
  }
  res.status(401).send("User hasn't logged in yet");
}