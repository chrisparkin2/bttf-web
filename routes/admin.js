
var express = require('express');
var admin_controller = require('../controllers/admin');
var policy = require('../config/policy');

module.exports = function(app){
  app.get("/admin/stats", admin_controller.stats);
}

