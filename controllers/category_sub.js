
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , CategoryMain = mongoose.model('CategoryMain')
  , CategorySub = mongoose.model('CategorySub');
var Status = require('../models/Status');


module.exports = {
 read : function(req, res){

    console.log("category_sub.read");
    console.log(req.body);
    console.log(req.body.category_main);
    console.log(req.body.category_main.objectId);

    var query = CategorySub.find();

    if(req.body.category_main) {
          query.where("_category_main").equals(req.body.category_main);
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

        console.log("data");
        console.log(data);


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


    // CategorySub.find({
    //   _category_main : req.body.category_main
    // }, function(err, data){

    //   if(err){
    //     status = Status.STATUS_FAILED;
    //     message = "error finding category data";

    //     res.json({
    //       status : status,
    //       message : message
    //     });
    //   } else{

    //     if(data){
    //       res.json({
    //         status : Status.STATUS_OK,
    //         data : data
    //       });
    //     } else{

    //       status = Status.STATUS_FAILED;
    //       message = "no categoryfound";

    //       res.json({
    //         status : status,
    //         message : message
    //       });
    //     }
    //   }
    // });

  },
  create : function(req, res){

    var name = req.body.name;

    CategorySub.find({
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
          CategorySub.create({

            name : req.body.name,
            _category_main : req.body.category_main

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