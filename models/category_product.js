// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , CategoryMain = mongoose.model('CategoryMain')
  , CategorySub = mongoose.model('CategorySub');


// set up the schema
var CategoryProductSchema = new Schema({
  name: { type: String },
  _category_main_id : { type: String, ref: 'CategoryMain' },
  _category_sub_id: { type: String, ref: 'CategorySub' },


},
{
  collection: 'categories_product'
}
)

// before save function equivalent
CategoryProductSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

CategoryProductSchema.set('toObject', { getters: true });

mongoose.model('CategoryProduct', CategoryProductSchema);

