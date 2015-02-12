// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  // , CategoryMain = mongoose.model('CategoryMain')
  // , CategorySub = mongoose.model('CategorySub')
  // , CategoryProduct = mongoose.model('CategoryProduct');



// set up the schema
var ProductSchema = new Schema({
  name: { type: String },
  price: {type : Number},
  supplier: {type : String},
  _category_main : { type: Number, ref: 'CategoryMain' },
  _category_sub : { type: Number, ref: 'CategorySub' },
  _category_product : { type: Number, ref: 'CategoryProduct' }

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
