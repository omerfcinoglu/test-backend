const express = require('express')
const {
    getPosts,
    updatePost,
    deletePost
} = require('../controllers/postController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getPosts)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

module.exports = router
