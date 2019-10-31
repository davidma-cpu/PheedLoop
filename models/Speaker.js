var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new SpeakerSchema object
// This is similar to a Sequelize model
var SpeakerSchema = new Schema({
  name: String,
  biography: String,
  photo: String,
  phoneNumber: Number,
  email: String
});

// This creates our model from the above schema, using mongoose's model method
var Speaker = mongoose.model("Speaker", SpeakerSchema);

// Export the Note model
module.exports = Speaker;
