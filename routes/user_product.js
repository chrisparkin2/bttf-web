
var express = require('express');
var user_product_controller = require('../controllers/user_product');
var policy = require('../config/policy');

module.exports = function(app){
  app.post("/user_product/create", policy.is_token_valid, user_product_controller.create);
  app.post("/user_product/read", policy.is_token_valid, user_product_controller.read);
}


