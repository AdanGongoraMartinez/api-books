import express from 'express';
import { getAllBooksUsers, getBooksUsersById, createBookUsers } from '../controllers/booksUsersController.js';

const router = express.Router();

router.get('/', getAllBooksUsers);
router.get('/:id', getBooksUsersById);
router.post('/', createBookUsers);

export default router;

