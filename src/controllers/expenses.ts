import { Request, Response } from 'express';

import { Expenses, IExpense } from '../models/expenses';

interface TotalSum {
    usd: number;
    uah: number;
}

const currencyes = {
    uah: 'UAH',
    usd: 'USD',
};

function getTotalSum(expenses: IExpense[]): TotalSum {
    const sum: TotalSum = {
        usd: 0,
        uah: 0,
    };

    return expenses.reduce((acc, expense) => {
        return expense.currency.includes(currencyes.uah)
            ? { ...acc, uah: acc.uah + expense.sum }
            : { ...acc, usd: acc.usd + expense.sum };
    }, sum);
}

export function getAllExpenses(req: Request, res: Response) {
    Expenses.find()
        .then((expenses) => {
            if (expenses.length) {
                res.status(200);
                res.json({ expenses, sum: getTotalSum(expenses) });
            } else {
                res.status(204);
                res.json({ message: 'No data available' });
            }
        })
        .catch(() => {
            res.status(404);
            res.json({ message: 'Data was not found' });
        });
}

export function getMonthlyExpenses(req: Request, res: Response) {
    res.status(200);
    res.json({ message: 'still in development' });
}

export function addExpense(req: Request, res: Response) {
    const { description, date, sum, category, currency } = req.body.data;

    Expenses.create({ description, date, sum, category, currency })
        .then((expense) => {
            console.log(' [addExpense] ', expense);
            res.status(201);
            res.json({ message: 'Expense Successfully added', expense });
        })
        .catch(() => {
            res.status(400);
            res.json({ message: 'Failed to add expense' });
        });
}

export function editExpense(req: Request, res: Response) {
    const { expense, id } = req.body;

    Expenses.findOneAndUpdate({ _id: id }, expense, function (err, result) {
        if (err) {
            res.status(400);
            res.json({ message: 'Failed to update item' });
        } else {
            console.log('[editExpense]', result);
            res.status(200);
            res.json({ message: 'Successfully updated' });
        }
    });
}

export function getCategoryExpenses(req: Request, res: Response) {
    const { category } = req.params;

    Expenses.find()
        .where('category')
        .equals(category)
        .then((data) => {
            if (data.length) {
                res.status(200);
                res.json({ data });
            } else {
            }
        })
        .catch(() => {
            console.error('Failed to get data by category');
            res.status(500);
            res.json({ message: 'Failed to get data by category' });
        });
}

export function removeExpense(req: Request, res: Response) {
    const { id } = req.body;

    Expenses.findOneAndDelete({ _id: id }, function (err, result) {
        if (err) {
            res.status(400);
            res.json("Couldn't delete item");
        } else {
            res.status(200);
            res.json({ message: 'item was removed' });
        }
    });
}
