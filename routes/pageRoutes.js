const express = require('express')
const {
    createPage, getPages, getPageById, deletePage
} = require('../controllers/pageController')
const {
    createPost, getPostsByPage
} = require('../controllers/postController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', auth, createPage)
router.get('/', getPages)
router.get('/:id', getPageById)
router.delete('/:id', auth, deletePage)

// --- Posts under a Page ---
router.post('/:pageId/posts', auth, createPost)
router.get('/:pageId/posts', getPostsByPage)

module.exports = router
