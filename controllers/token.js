
var mongoose = require('mongoose')
  , Token = mongoose.model('Token');


function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
 }

module.exports = {

  create: function (user, success_callback, error_callback) {

    var d = new Date();
    d.setMonth(d.getMonth() + 2);
    console.log(user);

    Token.create({
      token: generateUUID(),
      user_id: user.id,
      expire_time: d
    }, function (err, tk) {
      if (err) {
        console.log(err);

        return res.json(err);
      }
      tk.save(function(err, t) {
        if (err) {
          error_callback({message: "server error creating token"});
        }

        if (tk) {
          success_callback({"token_id" : tk.token});
        }
      });
    });
  },

  update: function (user, success_callback, error_callback) {

    var d = new Date();
    d.setMonth(d.getMonth() + 2);

    var update = {};
    update["token"] = generateUUID();
    update["expire_time"] = d;

    Token.update({
      user_id: user.id
    }, update, function(err, tk) {
      if (err) {
        error_callback({message : "could not update token"});
      } else {
        if(tk){
          success_callback({"token_id" : update["token"]});
        } else {
          error_callback({message: "old token not found"});
        }
      }
    });
  }

};
