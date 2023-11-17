const mongoose = require('mongoose');

const category = new mongoose.Schema({
    name: String,
    description: String,
    colorCode : String
});

module.exports = mongoose.model('Category', category);
