// import node modules
const mongoose = require('mongoose');

// define a schema
const CommentModelSchema = new mongoose.Schema ({
  creator_id    : String,
  creator_name  : String,
  convo_id      : String,
  content       : String,
});

// compile model from schema
module.exports = mongoose.model('CommentModel', CommentModelSchema);