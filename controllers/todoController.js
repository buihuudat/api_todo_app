const Todo = require("../models/todoModel");
const User = require("../models/userModel");

const createTodo = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) return res.status(401).json({ message: "User not found" });
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      auth: req.params.uid,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) return res.status(401).json({ message: "User not found" });

    const todos = await Todo.find({ auth: user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTodoById = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) return res.status(401).json({ message: "User not found" });

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTodoById = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) return res.status(401).json({ message: "User not found" });

    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
