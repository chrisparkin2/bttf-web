// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// set up the schema
var CategoryMainSchema = new Schema({
  name: { type: String }
},
{
  collection: 'categories_main'
}
);

// before save function equivalent
CategoryMainSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

CategoryMainSchema.set('toObject', { getters: true });

mongoose.model('CategoryMain', CategoryMainSchema);

