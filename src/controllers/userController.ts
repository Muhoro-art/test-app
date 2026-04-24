import { Request, Response } from 'express';

interface User {
  id: string;
  [key: string]: unknown;
}

const users: User[] = [];

export const userController = {
  getAllUsers: (req: Request, res: Response) => {
    res.json(users);
  },
  createUser: (req: Request, res: Response) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
  },
  getUser: (req: Request, res: Response) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  },
  updateUser: (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).send('User not found');
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  },
  deleteUser: (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).send('User not found');
    users.splice(index, 1);
    res.status(204).send();
  }
};
