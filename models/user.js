// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// set up the schema
var UserSchema = new Schema({
    username : { type: String, required: true },
    password : { type: String, required: true },
    email_address : { type: String, required: true },
    admin_status : { type: Boolean, required: false },
});

// before save function equivalent
UserSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

UserSchema.set('toObject', { getters: true });

mongoose.model('User', UserSchema)
