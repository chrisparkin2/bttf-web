
var express = require('express');
var category_main_controller = require('../controllers/category_main');
var category_sub_controller = require('../controllers/category_sub');
var category_product_controller = require('../controllers/category_product');


var policy = require('../config/policy');

module.exports = function(app){

  // main
  app.post("/category_main/read", policy.is_token_valid, category_main_controller.read);
  app.post("/category_main/create", policy.is_token_valid, category_main_controller.create);

  // sub
  app.post("/category_sub/read", policy.is_token_valid, category_sub_controller.read);
  app.post("/category_sub/create", policy.is_token_valid, category_sub_controller.create);

   // product
  app.post("/category_product/read", policy.is_token_valid, category_product_controller.read);
  app.post("/category_product/create", policy.is_token_valid, category_product_controller.create);
}


