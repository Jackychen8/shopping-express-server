/* TODO: Route functions should be refactored into controller files

Need:
  1. Create User
  2. Read User Purchase History
  3. Read User Cart
  4. Update User Cart
    1. Add Item
    2. Remove Item
    3. Checkout/Empty Cart and add items to Purchase History
*/
import { Router } from 'express';
import DB from '../models';

const router = Router();
const uDB = DB.users;


router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  return res.json(uDB.getData(`/${userId}`));
});

router.post('/', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if(uDB.getData("/")[email]) {
    return res.status(400).json({"msg": "E-mail is already used."});
  }
  const info = { email, password, firstName, lastName, history: [], cart: {} };
  uDB.push("email", info);
  return res.json(info);
});

router.get('/:userId/history', (req, res) => {
  return res.json({ history: uDB.getData(`/${email}/history`) });
})

router.get('/:userId/cart', (req, res) => {
  return res.json({ cart: uDB.getData(`/${email}/cart`) });
})

router.put('/:userId/cart', (req, res) => {
  // Add singular items to cart
  const { userId } = req.params;
  const { item } = req.body;
  const path = `/${userId}/cart/${item.id}`
  const prevItem = uDB.getData(path);
  if(prevItem) {
    prevItem.quantity++;
    uDB.push(path, prevItem);
  } else {
    uDB.push(path, item);
  }

  return res.send({});
})

export default router;