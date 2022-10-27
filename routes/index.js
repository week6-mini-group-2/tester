const express = require('express');
const router = express.Router();

const commentsRouter = require('./comment.js');
const postsRouter = require('./post.js');
const userRouter = require('./user.js');
const categoryRouter = require('./category.js');
const rankRouter = require('./rank');

router.use("/comments", commentsRouter);
router.use("/posts", postsRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/ranks", rankRouter);

module.exports = router; 