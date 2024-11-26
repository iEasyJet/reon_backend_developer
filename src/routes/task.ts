import express from 'express';
/* ------------------------------------------------------------------- */
import { verifyToken } from '../middlewars/handlerToken';
import { createTask } from '../controllers/task/createTask';
import { deleteTask } from '../controllers/task/deleteTask';
import { toggleArchiveTask } from '../controllers/task/toggleArchiveTask';
import { updateTask } from '../controllers/task/updateTask';
import { addUsersToTask } from '../controllers/task/addUsersToTask';
import { deleteUsersFromTask } from '../controllers/task/deleteUsersFromTask';
/* ------------------------------------------------------------------- */

const router = express.Router();

router.post('/create', verifyToken, createTask);

router.patch('/toggle-archive/:taskId', verifyToken, toggleArchiveTask);
router.patch('/update-task', verifyToken, updateTask);
router.patch('/add-users', verifyToken, addUsersToTask);
router.patch('/delete-users', verifyToken, deleteUsersFromTask);

router.delete('/delete/:taskId', verifyToken, deleteTask);

export default router;
