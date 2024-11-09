const express = require("express");

const { getPostData, getAllPosts } = require("../controllers/blog-controllers");

const router = express.Router();

router.get("/blog/blog-post/:postId", getPostData);
router.get("/blog/allPosts", getAllPosts);

module.exports = router;
