
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , CategoryMain = mongoose.model('CategoryMain')
  , CategorySub = mongoose.model('CategorySub')
  , CategoryProduct = mongoose.model('CategoryProduct');
var Status = require('../models/Status');


module.exports = {
 read : function(req, res){

    var query = CategoryProduct.find();

    if(req.body.category_sub) {
          query.where("_category_sub_id").equals(req.body._category_sub_id);
    }

    query.exec(function(err, data){
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

    CategoryProduct.find({
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
          CategoryProduct.create({
            name : req.body.name,
            _category_sub_id: req.body._category_sub_id,
            _category_main_id : req.body._category_main_id

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
                      // data : {
                      //   token_id : success_data["token_id"]
                      // }
                  });
                }
          });
        }
      }
    });
  }

 
}