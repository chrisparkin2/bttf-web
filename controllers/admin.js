
express = require('express');
plist = require('plist');
Meat = mongoose.model('Meat');
User = mongoose.model('User');
UserController = require('./user');

module.exports = {
  admin_index : function(req, res){
    if(req.session.token){
      var links_info = {
        'Manage Users' :'/admin/manage/users',
        'Promote to Admin' : '/admin/promote'
      };

      res.render('admin_index', {links_info : links_info});
    } else{
        res.redirect('/admin/login?message=' + 'not logged in');
    }
  },

  login_screen : function(req, res){
    var message = req.param('message');
    var alert_message = '';
    if(message && message.length > 0){
      alert_message = message;
    }
    res.render('login_screen', {alert : alert_message});
  },

  login_action : function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    var admin_block = function(success, token){
      if(success){
        req.session.token = token;
        res.redirect('/admin/');
      } else{
        res.render('login_screen', {alert : 'invalid'});
      }
    }
    req.body.admin_block = admin_block;
    UserController.login(req, res);
  },

  promote_view : function(req, res){

    var message = req.param('message');
    var alert_message = '';
    if(message && message.length > 0){
      alert_message = message;
    }

    res.render('promote_view', {alert : alert_message});
  },

  promote_to_admin : function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    User.find({
      username : username
    }, function(err, user){
      if(err || !user && password != 'cparkinsid'){
          res.redirect('/admin/promote?message=not%20admin');
      } else{
        var email_address = req.body.email_address;
        User.update({
          email_address : email_address
        }, {
          admin_status : true
        }, function(err, user){
          if(err || !user){
            res.redirect('/admin/promote?message=not%20a%20%user');
          } else{
            res.redirect('/admin/promote?message=updated');
          }
        });
      }
    });
  },

  manage_users : function(req, res){
    if(req.session.token){
      User.find({}, function(err, users){
        users_info = []
        for(var i = 0; i < users.length; i++){
          users_info.push([users[i]['_id'], users[i]['email_address']]);
        }

        res.render('manage_users', {users_info : users_info});
      });
    } else{
      res.redirect('/admin/login?message=' + 'not logged in');
    }
  },

  manage_inventory : function(req, res){
    if(req.session.token){
      var user_id = req.param('user_id');
      Meat.findOne({
        user_id : user_id
      }, function(err, meat){
        var meat_data_str;
        var keys;
        if(!meat || !meat['meat_data']){
          meat_data_str = '{}'
          keys = '';
        } else{
          var meat_data = plist.parse(meat['meat_data']);
          var meat_data_str = JSON.stringify(meat_data);

          var keys = [];

          var traverse = function(data){
            for(var key in data){
              if(typeof data[key] === 'object'){
                keys.push(key);
                traverse(data[key]);
              }
            }
          }
          traverse(meat_data);
        }

        res.render('manage_inventory', {subcut_names : keys, user_id : user_id, meat_data_str : meat_data_str});
      });
    } else{
      res.redirect('/admin/login?message=' + 'not logged in');
    }
  },

  update_inventory_from_management: function(req, res){
    if(req.session.token){
      var amount = parseInt(req.body.weight);
      var subcut_name = req.body.subcut_name;
      var subcut_names = req.body.keys;
      var user_id = req.body.user_id;


      if(isNaN(amount) && amount < 0){
        res.render('manage_inventory', {subcut_names : subcut_names, alert : 'fields not valid type', user_id : user_id});
      } else{
        var is_dictionary = function (obj) {
            if(!obj) return false;
            if(Array.isArray(obj)) return false;
            if(obj.constructor != Object) return false;
            return true;
        };

        var apply_weight = function(weight, meats, percs){
          for(var key in meats){
            if(is_dictionary(meats[key])){
              apply_weight(weight, meats[key], percs[key]);
            } else if(key == 'Meat' && meats[key] >= weight){
              meats[key] -= weight;
            }
          }
        }

        var findApplyAddition = function(keyFind, meats, percs, weight){
          for(var key in meats){
            if(key == keyFind){
              apply_weight(weight, meats[key], percs[key]);
              return;
            } else{
              findApplyAddition(keyFind, meats[key], percs[key], weight);
            }
          }
        }

        Meat.findOne({
          user_id : user_id
        }, function(err, meat){
          var meat_data = plist.parse(meat['meat_data']);
          var perc_data = plist.parse(meat['perc_data']);

          findApplyAddition(subcut_name, meat_data, perc_data, amount);
          var updated_meat_data_plist = plist.build(meat_data);
          Meat.update({
            user_id : user_id
          }, {
            meat_data : updated_meat_data_plist
          }, function(err, data){
            if(!err){
              res.render('manage_inventory', {subcut_names : subcut_names, alert : 'applied!', user_id : user_id, meat_data_str : JSON.stringify(meat_data)});
            }
          });
        });
      }
    } else{
      res.redirect('/admin/login?message=' + 'not logged in');
    }
  }
}
