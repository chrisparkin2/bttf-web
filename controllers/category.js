
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , Category = mongoose.model('Category');
var Status = require('../models/Status');

module.exports = {




  create : function(req, res){

    console.log("Cateogry req = " + req.body);

    var name = req.body.name;
    var level = req.body.level;
    var parent_id = req.body.parent._id;

    Category.find({
      name : name
    }, function(err, categories_found){
      if(err){
        status = Status.STATUS_FAILED;
        message = "Could not create Category: " + err;

        res.json({
          status : status,
          message : message
        });
      } else{
        if(categories_found.length){
          status = Status.STATUS_FAILED;
          message = "Category already exists"

          res.json({
            "status" : status,
            "message" : message
          });
        } else{
          Category.create({
            name : name,
            level : level,
            parent_id : parent_id
          }, function(err, category){
                status = Status.STATUS_OK;
                message = "";

                if(err){
                  status = Status.STATUS_FAILED;
                  message = "Could not create Category: " + err;

                  res.json({
                    "status" : status,
                    "message" : message
                  });
                }

                res.json({
                    status : Status.STATUS_OK,
                    message : "successfully created category",
                    // data : {
                    //   token_id : success_data["token_id"]
                    // }
                });
          });
        }
      }
    });
  },
}