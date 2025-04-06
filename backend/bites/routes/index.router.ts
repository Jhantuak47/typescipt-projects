import { Router } from 'express';
import cuisine from './cuisines.js';
import restaurants from './restaurants.js';

const router = Router();

router.use('/cuisines', cuisine);
router.use('/restaurants', restaurants);

export default router;