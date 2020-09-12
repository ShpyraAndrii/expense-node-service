import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
    name: string;
    custom: boolean;
}

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    custom: {
        type: Boolean,
        required: true,
    },
});

export const Category = mongoose.model<ICategory>('Categories', CategorySchema);
