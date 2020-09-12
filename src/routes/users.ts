import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200);
    res.json({
        data: { message: 'some message' },
    });
});

export default router;
