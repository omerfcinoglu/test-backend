const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Page = mongoose.model('Page', PageSchema)
module.exports = Page;