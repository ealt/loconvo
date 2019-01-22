// import node modules
const mongoose = require('mongoose');

// define a schema
const ConvoModelSchema = new mongoose.Schema ({
  creator_id    : String,
  creator_name  : String,
  convo_name    : String,
});

// compile model from schema
module.exports = mongoose.model('ConvoModel', ConvoModelSchema);
