// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// set up the schema
var ProductSchema = new Schema({
  name: { type: String },
  parent_id : {type : String},
  price: {type : Number},
  supplier: {type : String}
})

// before save function equivalent
ProductSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

ProductSchema.set('toObject', { getters: true });

mongoose.model('Product', ProductSchema);
