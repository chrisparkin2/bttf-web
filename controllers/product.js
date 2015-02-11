
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , Product = mongoose.model('Product');
var Status = require('../models/Status');

module.exports = {

  read : function(req, res){
    var user_id = req.body.user_id;

    Meat.findOne({
      user_id : user_id
    }, function(err, meat_data){
      if(err){
        status = Status.STATUS_FAILED;
        message = "error finding category";

        res.json({
          status : status,
          message : message
        });
      } else{
        if(meat_data){
          console.log(meat_data);
          res.json({
            status : Status.STATUS_OK,
            perc_data : meat_data['perc_data'],
            meat_data : meat_data['meat_data']
          });
        } else{
          status = Status.STATUS_FAILED;
          message = "no meat data found";

          res.json({
            status : status,
            message : message
          });
        }
      }
    });

  }
}