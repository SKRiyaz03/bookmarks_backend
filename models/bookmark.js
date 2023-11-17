const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    title: String,
    url: String,
    tag: String,
    description: String
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);