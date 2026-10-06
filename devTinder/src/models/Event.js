const mongoose = require('mongoose');
const User = require('./user.js')
const Chat = require('./chat.js')

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
    }
  },
  {timestamps: true}
)

module.exports = mongoose.model("Event", eventSchema);