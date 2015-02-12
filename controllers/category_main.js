
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , CategoryMain = mongoose.model('CategoryMain');
var Status = require('../models/Status');


module.exports = {
 read : function(req, res){

    CategoryMain.find({

    }, function(err, data){

      if(err){
        status = Status.STATUS_FAILED;
        message = "error finding category data";

        res.json({
          status : status,
          message : message
        });
      } else{

        if(data){
          res.json({
            status : Status.STATUS_OK,
            data : data
          });
        } else{

          status = Status.STATUS_FAILED;
          message = "no categoryfound";

          res.json({
            status : status,
            message : message
          });
        }
      }
    });

  },
  create : function(req, res){

    var name = req.body.name;


    CategoryMain.find({
      name : name
    }, function(err, data){
      if(err){
        status = Status.STATUS_FAILED;
        message = "Could not create Category: " + err;

        res.json({
          status : status,
          message : message
        });
      } else{
        if(data.length){
          status = Status.STATUS_FAILED;
          message = "Category already exists"

          res.json({
            "status" : status,
            "message" : message
          });
        } else{
          CategoryMain.create({
            name : name
          }, function(err, data){
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
                else {

                  res.json({
                      status : Status.STATUS_OK,
                      message : "successfully created category",
                     
                  });
                }
          });
        }
      }
    });
  }

 
}