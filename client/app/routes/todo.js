const express = require("express")
const router = express.Router()
const todo = require("../controller/todo.controller");
const { auth_jwt_token } = require("../authentication");

// /api/todo: GET, POST, DELETE
// /api/todo/:id: GET, PUT, DELETE
// /api/todo/completed: GET

// Create a new todo
router.post("/", todo.create)
  
// Retrieve all todos
router.get("/", todo.findAll);

// Retrieve all users
router.get("/users", todo.findAllUsers);

// Retrieve all completed todos
router.get("/completed/:completed", todo.findByStatus);

// Retrieve all assigned to me
router.get("/mytodos/:assignedTo", todo.findAssignedToMe);

// Retrieve all my todos
router.get("/created/:createdBy", todo.findTodosCreatedByMe);

// Update a Task with id
router.put("/:id", todo.update);

// Delete a Task with id
router.delete("/:id", todo.delete);

// Delete many Task
router.delete("/", todo.deleteAll);

module.exports = router