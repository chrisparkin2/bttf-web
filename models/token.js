// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// set up the schema
var TokenSchema = new Schema({
  token: { type: String },
  user_id: { type: String },
  expire_time: { type: Date, default: Date.now },
  expired: { type: Boolean, default: false },
  created_at: { type: Date },
  updated_at: { type: Date }
})

// before save function equivalent
TokenSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

TokenSchema.set('toObject', { getters: true });

mongoose.model('Token', TokenSchema);
