const Page = require("../models/Page");
const Post = require("../models/Post");


const createPage = async (req, res) => {
  const { title } = req.body
  const page = new Page({ title })
  await page.save()
  res.status(201).json(page)
}

const getPages = async (req, res) => {
  const pages = await Page.find()
  res.json(pages)
}

const getPageById = async (req, res) => {
  const { id } = req.params
  const page = await Page.findById(id).populate('posts')
  if (!page) return res.status(404).json({ message: 'Page not found' })
  res.json(page)
}

const deletePage = async (req, res) => {
  const { id } = req.params
  const page = await Page.findByIdAndDelete(id)
  if (!page) return res.status(404).json({ message: 'Page not found' })
  await Post.deleteMany({ page: id })
  res.json({ message: 'Page deleted' })
}

module.exports = {
  createPage,
  getPages,
  getPageById,
  deletePage,
};
