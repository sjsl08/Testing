const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  likes: { type: String, default: 0 },
  description: { type: String, required: true },
  PostImage: { type: String, required: true },
  date: { type: String, default: new Date().toLocaleDateString() },
});

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
