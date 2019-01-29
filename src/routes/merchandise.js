/*
Need:
  1. Get Merchandise (paginated)
TODO:
  Seller side routes (Adding/Updating merchandise)
*/

import { Router } from 'express';
import DB from '../models';


const router = Router();

router.get('/', (req, res) => {
  const { page, per } = req.query;
  // page should be 0-indexed
  const items = DB.merchandise.getData("/items");
  if (page !== undefined && per !== undefined) {
    const base = Number(page) * Number(per);
    if( base > items.length ){
      return res.status(400).json({"msg": "Query params out of range."});
    }
    return res.json(items.slice(base, base + Number(per)));
  }
  return res.json(items);
});

export default router;