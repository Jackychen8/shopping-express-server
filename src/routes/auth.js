/* TODO: Route functions should be refactored into controller files

Need:
  1. Authenticate User
  2. Generate Tokens
*/
import { Router } from 'express';
import DB from '../models';


const router = Router();

router.get('/', (req, res) => {
  return res.send({});
});

router.get('/:userId', (req, res) => {
  return res.send({token: ""});
});

router.post('/:userId', (req, res) => {
  return res.send({token: {}});
});

export default router;