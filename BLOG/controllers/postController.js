// const Post = require('../models/postModel');

// exports.createPost = async (req, res) => {
//     try {
//         const { title, body } = req.body;
//         const post = new Post({
//             title,
//             body
//         });
//         const savedPost = await post.save(); // ✅ corrected name
//         res.json({
//             post: savedPost // ✅ consistent usage
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Error creating post',
//             error: err.message
//         });
//     }
// };

// exports.getAllPosts = async (req, res) => {
//     try{
//         const posts = await Post.find().populate('comments').exec(); // populate comments field to get full comment details;
//         res.json({
//             posts,
//         })
//     }
//     catch(err){
//         console.error(err);
//         res.status(500).json({
//             message: 'Error fetching posts',
//             error: err.message
//         });
//     }
// }
