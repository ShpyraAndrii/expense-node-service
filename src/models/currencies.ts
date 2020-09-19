import mongoose, { Schema, Document } from 'mongoose';

export interface ICurrency extends Document {
    date: string;
    baseCur: string;
    rates: Rates;
}

export interface Rates {
    UAH: string;
    PLN: string;
    EUR: string;
    GBP: string;
}

const CurrencySchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    baseCur: {
        type: String,
        required: true,
    },
    rates: {
        UAH: {
            type: String,
            required: true,
        },
        PLN: {
            type: String,
            required: true,
        },
        EUR: {
            type: String,
            required: true,
        },
        GBP: {
            type: String,
            required: true,
        },
    },
});

export const Currency = mongoose.model<ICurrency>('Currencies', CurrencySchema);
