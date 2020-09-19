import { Request, Response } from 'express';
import { Currency } from '../models/currencies';
import { makeApiCall } from '../services/api';

const { currApiKey } = require('../config');

const currenciesEndpoint = `https://api.currencyfreaks.com/latest?apikey=${currApiKey}`;
const dateRegEx = /(\d){4}-(\d){2}-(\d){2}/g;

export async function retrieveLatestCurrencyRates(req: Request, res: Response) {
    const date = new Date(),
        dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const currencyRateFromDB = await Currency.findOne({ date: dateKey }).exec();

    if (currencyRateFromDB) {
        res.json({ latestRates: currencyRateFromDB });
    } else {
        let currencyRates;
        try {
            currencyRates = await getCurrentcyRates(dateKey);
        } catch (e) {
            console.error('Error while getting currencies rates ', e);
        }
        res.json(currencyRates ? { currencyRates } : { message: "Couldn't get rates" });
    }
}

async function getCurrentcyRates(dateKey: string) {
    const currencyRates: any = await makeApiCall(currenciesEndpoint);
    if (currencyRates) {
        const newCurrencyRate = {
            date: (currencyRates.date || '').match(dateRegEx)[0] || dateKey,
            baseCur: currencyRates.base,
            rates: {
                UAH: currencyRates?.rates.UAH,
                EUR: currencyRates?.rates.EUR,
                PLN: currencyRates?.rates.PLN,
                GBP: currencyRates?.rates.GBP,
            },
        };
        Currency.create(newCurrencyRate);
        return newCurrencyRate;
    }
    return false;
}
