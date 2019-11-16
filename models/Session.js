var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SessionSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `description` is required and of type String
  description: {
    type: String,
    required: true
  },
  // `rating` is not required and of type Array of Numbers
  ratings: {
    type: [Number],
    required: false
  },
  // `speakers` is an object that stores a speaker id
  // The ref property links the ObjectId to the Speaker model
  // This allows us to populate the Session with an associated Speakers
  speakers: [{
    name: String,
    biography: String,
    photo: String,
    phoneNumber: Number,
    email: String
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Session = mongoose.model("Session", SessionSchema);

// Export the Article model
module.exports = Session;
