import express from 'express';
import { getAllAuthors, getAuthorById, createAuthor } from '../controllers/authorsController.js';

const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', createAuthor);

export default router;

