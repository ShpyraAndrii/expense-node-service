import { Router } from 'express';

import {
    getAllExpenses,
    getMonthlyExpenses,
    addExpense,
    removeExpense,
    editExpense,
    getCategoryExpenses,
} from '../controllers/expenses';

const router = Router();

router.get('/', getAllExpenses);

router.get('/monthly', getMonthlyExpenses);

router.get('/category', getCategoryExpenses);

router.post('/new', addExpense);

router.delete('/remove', removeExpense);

router.patch('/edit', editExpense);

export default router;
