const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  fbId: String,
  firstName: String,
  lastName: String,
  avatarUrl: String,
  createdAt: {
    type: Date,
    default: Date.now // <=> new Date()
  },
  permissions: [String],
});
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
