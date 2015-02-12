
var express = require('express');
var product_controller = require('../controllers/product');
var policy = require('../config/policy');

module.exports = function(app){
  app.post("/product/create", policy.is_token_valid, product_controller.create);
  app.post("/product/read", policy.is_token_valid, product_controller.read);
}


