const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  picture: {
    type: String,
    required: true,
    trim: true,
  },
  nameTitle: {
    type: String,
    required: true,
    trim: true,
  },
  nameFirst: {
    type: String,
    required: true,
    trim: true,
  },
  nameLast: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  streetName: {
    type: String,
    required: true,
    trim: true,
  },
  streetNumber: {
    type: Number,
    required: true,
  },
  isFav: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
