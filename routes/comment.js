const express = require('express');
const comment_controller = require('../controllers/comment');

const router = express.Router();

router.get('/:id/comments', comment_controller.get_comments);
router.get('/:id/comments/:cid', comment_controller.get_comment);

module.exports = router;
