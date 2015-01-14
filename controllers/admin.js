
express = require('express');
plist = require('plist');
Meat = mongoose.model('Meat');
User = mongoose.model('User');

module.exports = {
  stats : function(req, res){

  },

  loginScreen : function(req, res){

  },

  manage_users : function(req, res){
    User.find({}, function(err, users){
      users_info = []
      for(var i = 0; i < users.length; i++){
        users_info.push([users[i]['_id'], users[i]['email_address']]);
      }

      res.render('manage_users', {users_info : users_info});
    });
  },

  manage_inventory : function(req, res){
    var user_id = req.param('user_id');
    Meat.findOne({
      user_id : user_id
    }, function(err, meat){
      var meat_data = plist.parse(meat['meat_data']);

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
      res.render('manage_inventory', {subcut_names : keys, user_id : user_id});
    })
  },

  update_inventory_from_management: function(req, res){
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
          } else{
            var weight = meats[key];
            var perc = percs[key];
            var weight_to_add = perc * weight;
            meats[key] -= weight_to_add;
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
            res.render('manage_inventory', {subcut_names : subcut_names, alert : 'applied!', user_id : user_id});
          }
        });
      });
    }
  }
}
