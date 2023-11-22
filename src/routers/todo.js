const express = require('express');
const {todos} = require('../data/index');

const todoRouter = express.Router();

todoRouter.get('/todo', (req, res) => {
  res.json(todos);
});

todoRouter.post('/todo', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    fecha: req.body.fecha,
    done: req.body.done || false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


todoRouter.get('/todo/:id', (req, res) => {
  const todoId = parseInt(req.params.id);

  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) {
    return res.status(404).send('Task not found');
  }

  res.json(todo);
});


todoRouter.patch('/todo/:id', (req, res) => {
  const todoId = parseInt(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).send('Task not found');
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...req.body,
  };

  res.json(todos[todoIndex]);
});

todoRouter.delete('/todo/:id', (req, res) => {
  const todoId = parseInt(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).send('Task not found');
  }

  todos.splice(todoIndex, 1);

  res.status(204).send();
});

module.exports = todoRouter;
