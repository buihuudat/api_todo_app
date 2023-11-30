const todoController = require("../controllers/todoController");

const router = require("express").Router();

router.post("/:uid", todoController.createTodo);

router.get("/:uid", todoController.getAllTodos);

router.get("/:uid/:id", todoController.getTodoById);

router.put("/:uid/:id", todoController.updateTodoById);

router.delete("/:id", todoController.deleteTodoById);

module.exports = router;
