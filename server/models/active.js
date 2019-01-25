// import node modules
const mongoose = require('mongoose');

// define a schema
const ActiveModelSchema = new mongoose.Schema (
  {
    user_id       : String,
    user_name     : String,
    convo_id      : String,
    convo_name    : String,
    latitude      : Number,
    longitude     : Number,
  },
  {timestamps: {createdAt: 'createdAt'}}
);

// compile model from schema
module.exports = mongoose.model('ActiveModel', ActiveModelSchema);
