/*
Need:
  1. Get Merchandise (paginate)
TODO:
  Seller side routes (Adding/Updating merchandise)
*/

import { Router } from 'express';
import DB from '../models';


const router = Router();

router.get('/', (req, res) => {
  return res.send(DB.merchandise.getData("/items"));
});

export default router;