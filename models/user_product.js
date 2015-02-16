// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  // , CategoryMain = mongoose.model('CategoryMain')
  // , CategorySub = mongoose.model('CategorySub')
  // , CategoryProduct = mongoose.model('CategoryProduct');



// set up the schema
var UserProductSchema = new Schema({
  user_id: { type: String, ref: 'User'},
  name: { type: String },
  price: {type : Number},
  supplier: {type : String},
  quantity_bulk:  {type : Number},
  quantity_per_case:  {type : Number},
  quantity_units:  {type : Number},
  _category_main_id : { type: String, ref: 'CategoryMain' },
  _category_sub_id : { type: String, ref: 'CategorySub' },
  _category_product_id : { type: String, ref: 'CategoryProduct' }

},
{
  collection: 'user_products'
}
)

// before save function equivalent
UserProductSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

UserProductSchema.set('toObject', { getters: true });

mongoose.model('UserProduct', UserProductSchema);
