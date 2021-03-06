import mongoose from 'mongoose';

export interface IExpense extends mongoose.Document {
    date: number;
    sum: number;
    description: string;
    category: string;
    currency: string;
}

const ExpenseSchema = new mongoose.Schema({
    date: {
        type: Number,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
});

export const Expenses = mongoose.model<IExpense>('Expenses', ExpenseSchema);
