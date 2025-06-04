const Post = require('../models/Post')
const Page = require('../models/Page')

exports.createPost = async (req, res) => {
  const { title, content, category, authorId } = req.body
  const { pageId } = req.params
  const post = new Post({
    title,
    content,
    category,
    author: authorId,
    page: pageId,
  })
  await post.save()
  await Page.findByIdAndUpdate(pageId, { $push: { posts: post._id } })
  res.status(201).json(post)
}

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'name')   // sadece yazarın adını çek
    .populate('page', 'title')  // sadece sayfa başlığını çek
  res.json(posts)
}

exports.getPostsByPage = async (req, res) => {
  const posts = await Post.find({ page: req.params.pageId })
    .populate('author', 'name')
  res.json(posts)
}

exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id)
  if (!post) return res.status(404).json({ message: 'Post not found' })
  await Page.findByIdAndUpdate(post.page, { $pull: { posts: post._id } })
  res.json({ message: 'Post deleted' })
}

exports.updatePost = async (req, res) => {
  const { title, content, category, authorId, pageId } = req.body
  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, category, author: authorId, page: pageId },
    { new: true }
  )
  if (!updated) return res.status(404).json({ message: 'Post not found' })
  res.json(updated)
}
