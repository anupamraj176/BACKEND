// controllers/updateTodo.js
const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
        {_id : id},
        {title,description,updatedAt:Date.now()}
    );

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: error.message,
    });
  }
};
