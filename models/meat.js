// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// set up the schema
var MeatSchema = new Schema({
  user_id: { type: String },
  perc_data : {type: String},
  meat_data : {type : String}
})

// before save function equivalent
MeatSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

MeatSchema.set('toObject', { getters: true });

mongoose.model('Meat', MeatSchema);
