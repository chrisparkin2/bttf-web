// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  // , CategoryMain = mongoose.model('CategoryMain');


// set up the schema
var CategorySubSchema = new Schema({
  name: { type: String },
  _category_main_id : { type: String, ref: 'CategoryMain' }  

},
{
  collection: 'categories_sub'
}
)

// before save function equivalent
CategorySubSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

CategorySubSchema.set('toObject', { getters: true });

mongoose.model('CategorySub', CategorySubSchema);

