
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , Product = mongoose.model('Product');
var Status = require('../models/Status');

module.exports = {

  read : function(req, res){

     var query = Product.find();

    if(req.body.category_product) {
          query.where("_category_product").equals(req.body.category_product);
    }

    query.exec(function(err, data){
      if(err){

        status = Status.STATUS_FAILED;
        message = "error finding product data";

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
          message = "no product found";

          res.json({
            status : status,
            message : message
          });
        }
      }
    });
  },

    // Product.find({
    //   _category_product : req.body.category_product
    // }, function(err, data){
    //   if(err){
    //     status = Status.STATUS_FAILED;
    //     message = "error finding product";

    //     res.json({
    //       status : status,
    //       message : message
    //     });
    //   } else{
    //     if(data){
    //       res.json({
    //         status : Status.STATUS_OK,
    //          data : data
    //       });
    //     } else{
    //       status = Status.STATUS_FAILED;
    //       message = "no product data found";

    //       res.json({
    //         status : status,
    //         message : message
    //       });
    //     }
    //   }
    // });

  create : function(req, res){

    var name = req.body.name;

    Product.find({
      name : name
    }, function(err, data){


      if(err){
        status = Status.STATUS_FAILED;
        message = "Could not create Product: " + err;

        res.json({
          status : status,
          message : message
        });
      } else{


        if(data.length){
          status = Status.STATUS_FAILED;
          message = "Product already exists"

          res.json({
            "status" : status,
            "message" : message
          });
        } else{
          Product.create({

            name : req.body.name,
            price : req.body.price,
            supplier : req.body.supplier,
            _category_main : req.body.category_main,
            _category_sub : req.body.category_sub,
            _category_product : req.body.category_product
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