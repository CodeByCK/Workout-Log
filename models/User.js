const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  img: { type: String, default: 'https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120' },
  location: { type: String },
  training: { type: String },
  goal: { type: String },
  bio: { type: String }
}, {
    timestamps: true
  });

const User = mongoose.model("User", userSchema);

module.exports = User;