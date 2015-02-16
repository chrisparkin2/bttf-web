
var mongoose = require('mongoose')
  , Token = mongoose.model('Token');

module.exports = {

  is_token_valid: function(req, res, next) {
    var token = req.body.token || '';
    delete req.body.token;

    // Find the token and map it to a user
    Token.findOne({
      token: token
    }, function(err, tk) {

      if (err){
        console.log("token error");
        console.log(token);
        console.log(err);
        return res.json(err);
      }

      // Token does not exist or access is denied
      if (!tk){
        console.log("Token does not exist or access is denied");
        return res.json({ error: "Access is denied." });
      }

      var d = new Date(tk.expire_time);
      var now = new Date();

      // Date comparison to see if token is expired
      if (d < now)
        return res.json({ error: "This token has expired. Please log in again." });

      req.body.user_id = tk.user_id;

      // Token is valid and request continues
      return next();
    });
  }
};
