const db = require('../models');
const Todo = db.todo;
const User = db.user;

// Create and Save a new blog
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.content) {
  //   res.status(400).send({ message: 'Content can not be empty!' });
  //   return;
  // }
  // Create a Task
  const todo = new Todo({
    title: req.body.title,
    dueDate: req.body.dueDate,
    createdDate: req.body.createdDate,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo,
    completed: req.body.completed,
  });

  // Save task in the database
  todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the task.',
      });
    });
};

// Retrieve all tasks/todos from the database.
exports.findAll = (req, res) => {
  Todo.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      });
    });
};

//get all users
exports.findAllUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      });
    });
};

// Update a task by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: 'Todo was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      } else {
        res.send({
          message: 'Todo was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Task with id=' + id,
      });
    });
};

// Delete all tasks from the database.
exports.deleteAll = (req, res) => {
  Todo.deleteMany({completed: 1})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Todos were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all todos.',
      });
    });
};

// Find all  Completed
exports.findByStatus = (req, res) => {
  Todo.find({ completed: req.params.completed })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      });
    });
};

exports.findAssignedToMe = (req, res) => {
  Todo.find({ assignedTo: req.params.assignedTo})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      });
    });
};

exports.findTodosCreatedByMe = (req, res) => {
  Todo.find({ createdBy: req.params.createdBy })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving todos.',
      });
    });
};
