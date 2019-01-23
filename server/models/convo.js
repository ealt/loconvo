// import node modules
const mongoose = require('mongoose');

// define a schema
const ConvoModelSchema = new mongoose.Schema (
  {
    creator_id    : String,
    creator_name  : String,
    convo_name    : String,
    latitude      : Number,
    longitude     : Number,
    radius        : Number,
  },
  {timestamps: {createdAt: 'createdAt'}}
);

// compile model from schema
module.exports = mongoose.model('ConvoModel', ConvoModelSchema);
