import express from 'express';
/* ------------------------------------------------------------------- */
import { verifyToken } from '../middlewars/handlerToken';
import { createBoard } from '../controllers/board/createBoard';
import { deleteBoard } from '../controllers/board/deleteBoard';
import { toggleArchiveBoard } from '../controllers/board/toggleArchiveBoard';
import { addUsersToBoard } from '../controllers/board/addUsersToBoard';
import { deleteUsersFromBoard } from '../controllers/board/deleteUsersFromBoard';
import { updateBoard } from '../controllers/board/updateBoard';
/* ------------------------------------------------------------------- */

const router = express.Router();

router.post('/create', verifyToken, createBoard);

router.patch('/toggle-archive/:boardId', verifyToken, toggleArchiveBoard);
router.patch('/add-users', verifyToken, addUsersToBoard);
router.patch('/delete-users', verifyToken, deleteUsersFromBoard);
router.patch('/update-board', verifyToken, updateBoard);

router.delete('/delete/:boardId', verifyToken, deleteBoard);

export default router;
