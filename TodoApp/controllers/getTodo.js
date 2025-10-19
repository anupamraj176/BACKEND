//import th model
const Todo = require('../models/Todo')


exports.getTodo = async(req,res) => {
    try{
        //fetch all data from database
        const todos = await Todo.find({});

        //response
        res.status(200).json({
            success : true,
            data:todos,
            message:"Entire Todo data is fetched Successfully"
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Server error"
        })
    }
}

exports.getTodoById = async(req,res) => {
    try{
        //extract todo item basis on id
        const id = req.params.id;
        const todos = await Todo.findById({_id:id});

        //data forgiven id not found
        if(!todos){
            return res.status(404)({
                success : false,
                message : "No data found with a given id"
            })
        }

        //if found
        res.status(200).json({
            success:true,
            data:todos,
            message :`Todo ${id} data fetched successfully`
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Server error"
        })
    }
}