const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: [true, "please provide email addess"],
    minlength: 3,
    maxlength: 100,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
});
