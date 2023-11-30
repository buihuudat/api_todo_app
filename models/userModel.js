const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
    },

    fullname: String,

    email: String,

    avatar: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/242/245/png-clipart-ipod-touch-app-store-action-item-macos-apple-purple-violet-thumbnail.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
