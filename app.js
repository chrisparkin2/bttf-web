var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var mongoose = require('mongoose');
var app = express();


//aws = require('aws-sdk');
//aws.config.loadFromPath('./config/aws_config.json');


var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));

app.use(bodyParser({strict: false}));
app.use(busboy());
app.set('port', process.env.PORT || 3000);

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);

    //connect mongo
    var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/bttf';
    mongoose.connect(uri, function(err) {
      if (err) console.log(err);
      console.log('connected mongo');
    });
});

//load models
var models_path = __dirname + '/models/'
fs.readdirSync(models_path).forEach(function (file) {
  if(~file.indexOf('.js')){
    require(models_path + '/' + file);
  }
})


//routes
index_route = require('./routes/index')(app);
user_route = require('./routes/user')(app);
admin_route = require('./routes/admin')(app);
meat_route = require('./routes/meat')(app);
