// module dependencies
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// set up the schema
var CategorySchema = new Schema({
  name: { type: String },
  level : {type: Number},
  parent_id : {type : String}
},
{
  collection: 'categories'
}
)

// before save function equivalent
CategorySchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
})

CategorySchema.set('toObject', { getters: true });

mongoose.model('Category', CategorySchema);
