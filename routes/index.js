
var express = require('express');
var index_controller = require('../controllers/index');
var policy = require('../config/policy');

module.exports = function(app){
  app.get('/', index_controller.main);
}

