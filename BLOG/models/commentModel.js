// import mongoose
const mongoose = require('mongoose');

// route handler for comments
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // reference to the post model
    },
    user: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});

// export the comment model
module.exports = mongoose.model('Comment', commentSchema);