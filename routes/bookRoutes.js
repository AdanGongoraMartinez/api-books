import express from 'express';
import { getAllBooks, getBooksById, deleteBook, updateBook, createBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBooksById);
router.get('/delete/:id', deleteBook);
router.get('/update/:id', updateBook);
router.post('/', createBook);

export default router;

