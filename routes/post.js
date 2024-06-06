const express = require('express');
const post_controller = require('../controllers/post');

const router = express.Router();

router.get('/', post_controller.get_posts);

module.exports = router;
