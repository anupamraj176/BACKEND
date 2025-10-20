// import mongoose
const mongoose = require('mongoose');

// Define the like schema
const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // reference to the Post model (capitalize if that's your model name)
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
});

// Export the Like model
module.exports = mongoose.model('Like', likeSchema);
