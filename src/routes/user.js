/*
Need:
  1. Create User X
  2. Read User Purchase History X
  3. Read User Cart X
  4. Update User Cart
    1. Add Item X
    2. Remove Item X
    3. Checkout/Empty Cart and add items to Purchase History X
*/
import { Router } from 'express';

import {
  getUser,
  createUser,
  getHistory,
  updateHistory,
  getCart,
  updateCart,
  loadUser
} from '../controllers/users';

const router = Router();

router.get('/:userId', getUser);

router.post('/', createUser);

router.get('/:userId/history', getHistory);

router.put('/:userId/history', updateHistory);

router.get('/:userId/cart', getCart);

router.put('/:userId/cart', updateCart);

// Load all routes with userId param with userObj
router.param("userId", loadUser);

export default router;