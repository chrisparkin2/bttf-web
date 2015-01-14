
var express = require('express');
var admin_controller = require('../controllers/admin');
var policy = require('../config/policy');

module.exports = function(app){
  app.get("/admin/manage/users", admin_controller.manage_users);
  app.get("/admin/manage/inventory", admin_controller.manage_inventory);
  app.get("/admin/login", admin_controller.login_screen);
  app.get("/admin/", admin_controller.admin_index);
  app.get("/admin/promote", admin_controller.promote_view);
  app.post("/admin/manage/update_inventory_from_management", admin_controller.update_inventory_from_management);
  app.post("/admin/login_action", admin_controller.login_action);
  app.post("/admin/promote_to_admin", admin_controller.promote_to_admin);
}

