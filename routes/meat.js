
var express = require('express');
var meat_controller = require('../controllers/meat');
var policy = require('../config/policy');

module.exports = function(app){
  app.post("/meat/update", policy.is_token_valid, meat_controller.save_perc_meat_total);
  app.post("/meat/read", policy.is_token_valid, meat_controller.read);
}


