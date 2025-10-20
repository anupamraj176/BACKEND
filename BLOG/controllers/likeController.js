const Post = require('../models/postModel');
const Like = require('../models/likeModel');

// exports.likePost = async (req, res) => {
//     try {
//         const { post, user } = req.body;

//         const like = new Like({
//             post,
//             user
//         });

//         const savedLike = await like.save();

//         // Update the post to include the new like
//         const postUpdate = await Post.findByIdAndUpdate(
//             post,
//             { $push: { likes: savedLike._id } },
//             { new: true }
//         ).populate('likes'); // ✅ Removed .exec()

//         res.json({
//             post: postUpdate,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error liking post',
//             error: err.message
//         });
//     }
// };


// // unlike
// exports.unlikePost = async (req,res) => {
//     try{
//         const { post , like }= req.body;
//         // find and delete from the like collection
//         const deletedLike = await Like.findOneAndDelete(({post:post,_id:like}));
//         // update the post collection
//         const updatedPost = await Post.findByIdAndUpdate(post,{$pull : {likes : deletedLike._id}},{new:true});

//         res.json({
//             post : updatedPost,
//         });
//     }
//    catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error unliking post',
//             error: err.message
//         });
//    }    
// }

exports.dummyLink = (req, res) => {
    res.send('This is a dummy link response');
};
