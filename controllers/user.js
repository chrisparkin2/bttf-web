
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , User = mongoose.model('User');
var Status = require('../models/Status');

module.exports = {
  create : function(req, res){
    User.find({
      username : req.body.username
    }, function(err, users_found){
      if(err){
        status = Status.STATUS_FAILED;
        message = "Could not create User: " + err;

        res.json({
          status : status,
          message : message
        });
      } else{
        if(users_found.length){
          status = Status.STATUS_FAILED;
          message = "Username already found"

          res.json({
            "status" : status,
            "message" : message
          });
        } else{
          User.create(req.body , function(err, user){
                status = Status.STATUS_OK;
                message = "";

                if(err){
                  status = Status.STATUS_FAILED;
                  message = "Could not create User: " + err;

                  res.json({
                    "status" : status,
                    "message" : message
                  });
                }

                token_manager.create(user, function(success_data){
                  res.json({
                    status : Status.STATUS_OK,
                    message : "successfully created user",
                    data : {
                      token_id : success_data["token_id"]
                    }
                  });
                }, function(err_data){
                  message = err_data["message"];

                  res.json({
                    "status" : status,
                    "message" : message
                  });
                });
          });
        }
      }
    });
  },

  login : function(req, res){
    var username = req.body.username;
    var input_password = req.body.password;
    var admin_block = req.body.admin_block;

    User.findOne({
      username : username
    }, function(err, user){

      if(err){
        if(admin_block){
          admin_block(false, null);
        } else{
          status = Status.STATUS_FAILED;
          message = "error finding user";

          res.json({
            status : status,
            message : message
          });
        }
      }


      if(!user){
        if(admin_block){
          admin_block(false, null);
        } else{
          status = Status.STATUS_FAILED;
          message = "User does not exist";

          res.json({
            status : status,
            message : message
          });
        }
      } else{
        if(user.password != input_password){
          if(admin_block){
          admin_block(false, null);
          } else{
            status = Status.STATUS_FAILED;
            message = "incorrect password";

            res.json({
              status : status,
              message : message
            });
          }
        } else{

          token_manager.update(user, function(success_data){

            if(admin_block){
              admin_block(user.admin_status, success_data['token_id']);
            } else{
              res.json({
                status : Status.STATUS_OK,
                message : "successful login",
                data : {
                  username : user.username,
                  objectId : user._id,
                  token_id : success_data["token_id"]
                }
              });
            }

          }, function(error_data){
            if(admin_block){
              admin_block(false, null);
            } else{
              status = Status.STATUS_FAILED;
              message = error_data['message'];

              res.json({
                status : status,
                message : message
              });
            }
          });
        }
      }
    });
  },

  // become : function(req, res){

  //    token_manager.update(req.body.user, function(success_data){

  //           if(admin_block){
  //             admin_block(user.admin_status, success_data['token_id']);
  //           } else{
  //             res.json({
  //               status : Status.STATUS_OK,
  //               message : "successful become user",
  //               data : {
  //                 username : user.username,
  //                 objectId : user._id,
  //                 token_id : success_data["token_id"]
  //               }
  //             });
  //           }

  //         }, function(error_data){
  //           if(admin_block){
  //             admin_block(false, null);
  //           } else{
  //             status = Status.STATUS_FAILED;
  //             message = error_data['message'];

  //             res.json({
  //               status : status,
  //               message : message
  //             });
  //           }
  //         });

  // }


}

