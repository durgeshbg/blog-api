const express = require('express');
const post_controller = require('../controllers/post');

const router = express.Router();

router.get('/', post_controller.get_posts);
router.post('/', post_controller.create_post);
router.get('/:id', post_controller.get_post);
router.put('/:id', post_controller.update_post);
router.delete('/:id', post_controller.delete_post);

module.exports = router;
