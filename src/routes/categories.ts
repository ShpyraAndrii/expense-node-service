import { Router } from 'express';

import { getCategories, addCategory } from '../controllers/categories';

const router = Router();

router.get('/', getCategories);

router.post('/new', addCategory);

export default router;
