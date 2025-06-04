const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
}, {
  timestamps: { createdAt: 'date', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('Post', PostSchema)
