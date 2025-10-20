// // import model
// const Post = require('../models/postModel');
// const Comment = require('../models/commentModel');

// exports.createComment = async (req, res) => {
//     try{
//         // fetch data from request body
//         const data = req.body;

//         if (!req.body) {
//             return res.status(400).json({ error: "Request body is missing" });
//         }

//         const { post, user, body } = data;

//         // create a new comment
//         const comment = new Comment({
//             post,
//             user,
//             body
//         })
//         // save the comment to the database
//         const savedComment = await comment.save();

//         // find the post by id and add the comment to the post's comments array
//        const postUpdate = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
//        .populate('comments') //populate the comments field to get full comment details
//        .exec();

//         // return the updated post with the new comment
//         res.status(201).json({
//             post : postUpdate,
//             message: 'Comment added successfully',
//         });

//     }
//     catch(err){
//         console.error(err);
//         res.status(500).json({
//             message: 'Error adding comment',
//             error: err.message
//         });
//     }
// }


//import model
const Post = require('../models/postModel');
const Like = require('../models/likeModel');

//business logic

exports.createComment = async (req,res) => {
    try{
        const {post,user,body} = req.body;
        const comment = new Comment ({
            post,user,body
        })
        const savedComment = await comment.save();
    }
    catch(error){

    }
}