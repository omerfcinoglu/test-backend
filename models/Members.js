const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;
