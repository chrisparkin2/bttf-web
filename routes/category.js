
var express = require('express');
var category_controller = require('../controllers/category');
var policy = require('../config/policy');

module.exports = function(app){
  app.post("/category/read", policy.is_token_valid, category_controller.read);
  app.post("/category/create", policy.is_token_valid, category_controller.create);
}


