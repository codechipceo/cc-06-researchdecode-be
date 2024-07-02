const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    recepient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chats = new mongoose.model("Chat", chatSchema);
module.exports = Chats;
