const BlogPost = require("../models/blogPost");
const User = require("../models/user");

const getPostData = (req, res) => {
    try {
        const { postId } = req.params;
        // console.log(postId);
        BlogPost.findById(postId)
            .then((result) => res.status(200).json(result))
            // .then((result) => console.log(result))
            .catch((e) => res.status(500).json(e));
    } catch (e) {
        res.status(500).json(e);
    }
};

const getSortedPosts = (req, res) => {
    try {
        const { type } = req.params;
        if (type === "top") {
            BlogPost.find()
                .sort({ likes: -1 })
                .limit(4)
                .then((result) => res.status(200).json(result))
                .catch((error) => res.status(500).json(error));
        }
        if (type === "last") {
            BlogPost.find()
                .sort({ createdAt: -1 })
                .limit(9)
                .then((result) => res.status(200).json(result))
                .catch((error) => res.status(500).json(error));
        }
    } catch (e) {
        res.status(500).json(e);
    }
};

const getTopAuthors = (req, res) => {
    try {
        User.find({ bloger: true })
            .sort({ "blogData.blogerRating": -1 })
            .limit(4)
            .then((result) => result.map((item) => item._id))
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(200).json(error));
    } catch (e) {
        res.status(500).json(e);
    }
};

const getDataForBadge = (req, res) => {
    try {
        const { userId } = req.params;
        User.findById(userId)
            .then((result) => {
                return result.blogData;
            })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(500).json(error));
    } catch (e) {
        res.status(500).json(e);
    }
};

const getAllPosts = (req, res) => {
    // BlogPost.find().then((result) => res.status(200).json(result));
    // return res.status(200).json("All ok");
};

module.exports = {
    getPostData,
    getSortedPosts,
    getAllPosts,
    getTopAuthors,
    getDataForBadge,
};
