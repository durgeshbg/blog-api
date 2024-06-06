const express = require('express');
const blog_controller = require('../controllers/blog');

const router = express.Router();

router.get('/', blog_controller.get_blogs);

module.exports = router;
