
var express = require('express');
var token_manager = require('./token');
var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Meat = mongoose.model('Meat');
var Status = require('../models/Status');

module.exports = {

  save_perc_meat_total : function(req, res){
    var user_id = req.body.user_id;
    var perc_data = req.body.perc_data;
    var meat_data = req.body.meat_data;

    Meat.update({
      user_id : user_id
    }, {
      perc_data : perc_data,
      meat_data : meat_data
    }, function(err, data){

      if(err){
        status = Status.STATUS_FAILED;
        message = "error updating meat data";

        res.json({
          status : status,
          message : message
        });
      } else{
        if(data){
          res.json({
            status : Status.STATUS_OK,
          });
        } else{
          Meat.create({
            user_id : user_id,
            perc_data : perc_data,
            meat_data : meat_data
          }, function(err, meat){
            if(err){
              status = Status.STATUS_FAILED;
              message = "error creating meat data";

              res.json({
                status : status,
                message : message
              });
            } else{
              res.json({
                status : Status.STATUS_OK,
              });
            }
          })
        }
      }
    });
  },

  read : function(req, res){
    var user_id = req.body.user_id;

    Meat.findOne({
      user_id : user_id
    }, function(err, meat_data){
      if(err){
        status = Status.STATUS_FAILED;
        message = "error finding meat data";

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