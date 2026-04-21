import { Request, Response } from 'express';

let tasks = [];

export const createTask = (req: Request, res: Response) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
};

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
};

export const deleteTask = (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};