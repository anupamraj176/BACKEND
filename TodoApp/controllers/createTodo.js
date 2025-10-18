//import th model
const Todo = require('../models/Todo')


exports.createTodo = async(req,res) => {
    try{
        // extract title and description from req body
        const {title,description} = req.body;

        // create a new todo object insert into db
         const response = await Todo.create({ title, description });

        //send a json response with successful flag
        res.status(200).json({
            success : true,
            data : response,
            message : "Entry Created successfully"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success : false,
            data:"internal Server error",
            message : err.message
        })
    }
}