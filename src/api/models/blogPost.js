const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    userId: String,
    title: String,
    subtitle: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    themes: Array,
    likes: Number,
    title_image: String,
    short_description: String,
    description: String,
    bloquote: String,
});

const BlogPost = mongoose.model("blog_posts", blogPostSchema);

module.exports = BlogPost;
