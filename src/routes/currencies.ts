import { Router } from 'express';
import { retrieveLatestCurrencyRates } from '../controllers/currencies';

const router = Router();

router.get('/', retrieveLatestCurrencyRates);

export default router;
