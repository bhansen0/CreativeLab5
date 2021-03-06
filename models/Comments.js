var mongoose = require('mongoose');
var MemeSchema = new mongoose.Schema({
  title: String,
  url: String,
  upvotes: {type: Number, default: 0},
});
MemeSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Meme', MemeSchema);


