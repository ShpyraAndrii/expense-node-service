import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import body_parser from 'body-parser';
import winston from 'winston';
import express_winston from 'express-winston';

import expenses_router from './routes/expenses';
import users_router from './routes/users';

const app = express();

app.use(cors());

app.use(body_parser.json());

app.use(
    express_winston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
        meta: true,
        expressFormat: true,
        colorize: true,
    })
);

app.use('/expenses', expenses_router);
app.use('/users', users_router);

app.use(
    (err: { message: string; status: number }, req: Request, res: Response, next: NextFunction) => {
        console.log(' -- [url] ', req.url);
        console.log(' -- [data] ', req.body);

        res.status(err.status || 500);
        res.json({
            message: err.message,
        });
        next();
    }
);

export { app };
