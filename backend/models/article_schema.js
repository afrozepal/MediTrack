const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    publishDate: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true
    }
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;