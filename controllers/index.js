

mongoose = require('mongoose');

module.exports = {
  main: function(req, res){
    res.render('index', {message : 'BTTF is up!'});
  }
}
