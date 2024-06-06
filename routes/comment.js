const express = require('express');
const comment_controller = require('../controllers/comment');

const router = express.Router();

router.get('/', comment_controller.get_comments);

module.exports = router;
