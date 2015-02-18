
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , UserProduct = mongoose.model('UserProduct');
var Status = require('../models/Status');

module.exports = {

  read : function(req, res){

    var query = UserProduct.find();

    if(req.body.category_product) {
          query.where("_category_product_id").equals(req.body._category_product_id);
    }

    if(req.body.user_id) {
          query.where("user_id").equals(req.body.user_id);
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


  update : function(req, res){

    UserProduct.update({
      _id : req.body._id
    }, 
    {
      name : req.body.name,
      price : req.body.price,
      supplier : req.body.supplier,
      quantity_bulk: req.body.quantity_bulk,
      quantity_per_case: req.body.quantity_per_case,
      quantity_units: req.body.quantity_units,
      _category_main_id : req.body._category_main_id,
      _category_sub_id : req.body._category_sub_id,
      _category_product_id : req.body._category_product_id
    }, function(err, data){

      if(err){
        status = Status.STATUS_FAILED;
        message = "Error updating UserProduct data";

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
        } 
        // else{

        //   Meat.create({
        //     user_id : user_id,
        //     perc_data : perc_data,
        //     meat_data : meat_data
        //   }, function(err, meat){
        //     if(err){
        //       status = Status.STATUS_FAILED;
        //       message = "error creating meat data";

        //       res.json({
        //         status : status,
        //         message : message
        //       });
        //     } else{
        //       res.json({
        //         status : Status.STATUS_OK,
        //       });
        //     }
        //   })
        // }
      }
    });
  },

  create : function(req, res){
    UserProduct.find({
      user_id : req.body.user_id,
      name : req.body.name
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
          console.log("req.body.category_product");
          console.log(req.body.category_product);

          UserProduct.create({
            user_id : req.body.user_id,
            name : req.body.name,
            price : req.body.price,
            supplier : req.body.supplier,
            quantity_bulk: req.body.quantity_bulk,
            quantity_per_case: req.body.quantity_per_case,
            quantity_units: req.body.quantity_units,
            _category_main_id : req.body._category_main_id,
            _category_sub_id : req.body._category_sub_id,
            _category_product_id : req.body._category_product_id
          }, function(err, data){

              status = Status.STATUS_OK;
              message = "";

            if(err){
                  status = Status.STATUS_FAILED;
                  message = "Could not create Product: " + err;

                  res.json({
                    "status" : status,
                    "message" : message
                  });
                }
            else {


              res.json({
                  status : Status.STATUS_OK,
                  message : "successfully created Product",
                  data : data

              });
            }
          });
        }
      }
    });
  }

}