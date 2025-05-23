
const mongoose = require('mongoose')
const { concertSchema } = require('./schema')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  concerts: [concertSchema],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;