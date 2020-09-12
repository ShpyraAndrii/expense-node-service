import { Request, Response } from 'express';

export function addCategory(req: Request, res: Response) {
    console.log(' [addCategory] ', req.body);
    res.status(200);
    res.json({ message: 'In progress' });
}

export function getCategories(req: Request, res: Response) {
    console.log(' [getCategories] ');
    res.status(200);
    res.json({ message: 'In progress' });
}
