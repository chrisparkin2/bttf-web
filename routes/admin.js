
var express = require('express');
var admin_controller = require('../controllers/admin');
var policy = require('../config/policy');

module.exports = function(app){
  app.get("/admin/manage/users", admin_controller.manage_users);
  app.get("/admin/manage/inventory", admin_controller.manage_inventory);
  app.post("/admin/manage/update_inventory_from_management", admin_controller.update_inventory_from_management);
}

