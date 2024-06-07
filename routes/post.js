const express = require('express');
const post_controller = require('../controllers/post');

const router = express.Router();

router.get('/', post_controller.get_posts);
router.post('/create', post_controller.create_post);
router.get('/:id', post_controller.get_post);

module.exports = router;
