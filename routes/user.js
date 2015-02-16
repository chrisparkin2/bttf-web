
var express = require('express');
var user_controller = require('../controllers/user');
var policy = require('../config/policy');

module.exports = function(app){
  app.post("/user/create", user_controller.create);
  app.post("/user/login", user_controller.login);
  // app.post("/user/become", user_controller.become);
}


