import express from 'express';

import {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
} from '../controllers/users';

// Middleware
import authentication from '../middleware/authentication';

const router = express.Router();

router
  .get('/', getUsers)
  .get('/me', authentication, getUser)
  .post('/', createUser)
  .post('/login', loginUser)
  .post('/logout', authentication, logoutUser)
  .patch('/me', authentication, updateUser)
  .delete('/me', authentication, deleteUser);

export default router;
