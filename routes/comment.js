const express = require('express');
const comment_controller = require('../controllers/comment');

const router = express.Router();

router.get('/:id/comments', comment_controller.get_comments);
router.post('/:id/comments', comment_controller.create_comment);
router.get('/:id/comments/:cid', comment_controller.get_comment);
router.put('/:id/comments/:cid', comment_controller.update_comment);
router.delete('/:id/comments/:cid', comment_controller.delete_comment);

module.exports = router;
