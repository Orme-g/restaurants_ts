const express = require("express");

const {
    getPostData,
    getAllPosts,
    getSortedPosts,
    getTopAuthors,
    getDataForBadge,
} = require("../controllers/blog-controllers");

const router = express.Router();

router.get("/blog/blog-post/:postId", getPostData);
router.get("/blog/allPosts", getAllPosts);
router.get("/blog/posts/:type", getSortedPosts);
router.get("/blog/top-authors", getTopAuthors);
router.get("/blog/badge-data/:userId", getDataForBadge);

module.exports = router;
