const express = require('express');
const UserService = require('../services');
const {authCheck} = require('../middlewares');


module.exports = ()=>{
  const router = express.Router();
  router
    //check user auth status
    .get('/', authCheck, (req, res)=>{
      const user = {
        userid: req.session.userd,
        name: req.session.name,
      }
      res.status(200).send({
        message: "User is logged in",
        user_data: user
      });
    })
    //login
    .post('/login', async (req, res)=>{
      try{
        const {email, password} = req.body;
        const userData = await UserService.login(email, password);
        if(!userData){
          return res.status(200).send({
            error: "This email hasn't been registerd yet"
          });
        }
        await UserService.createSession(req.session, userData);
        res.status(200).send({
          message: "ok",
          user_data: userData
        });
        return;
      }catch(error){
        console.log(error);
        res.status(500).send(error.toString());
      }
    })
    // logout
    .get('/logout', async (req, res)=>{
      try{
        await UserService.logout(req.session);
        res.status(200).send({
          message: "ok"
        });
      } catch(error){
        res.status(500).send(error.toString());
      }
    })
    // register
    .post('/signup', async (req, res)=>{
      try{
        const isEmailValid = UserService.register(req.body);
        if(isEmailValid){
          res.status(200).send({
            message: "ok"
          });
          return;
        }
        res.status(200).send({
          error: "This email has been registerd!"
        });
      } catch(error){
        res.status(500).send(error.toString());
      }
    })
    //get user profile
    .get('/profile', authCheck, async (req, res)=>{
      try{
        const {userid: userID} = req.session;
        const userData = await UserService.getUserProfile(userID);
        res.status(200).send({
          message: "ok", 
          user_data: userData
        });
      } catch(error){
        res.status(500).send(error.toString());
      }
    });
  return router;
}