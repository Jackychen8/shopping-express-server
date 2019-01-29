/* TODO: Route functions should be refactored into controller files

Need:
  1. Authenticate User
  2. Generate Tokens

Normal authentication flow is:
  1. User Creation
    1. Frontend receives salt to hash password
    2. Frontend sends hashed password with used salt to backend to be stored
  2. User Login
    1. User submits password
    2. Frontend gets user-specific salt and hashes password with salt
    3. Frontend sends hashed password to auth server
    4. Auth server verifies hashed password
    5. Auth server provides time-bound JWT and refresh token
*/
import { Router } from 'express';
import DB from '../models';

const uDB = DB.users;
const router = Router();

// router.post('/', (req, res) => {
//   return res.send({token: ""});
// });

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const id = uDB.getData("/used")[email];
  if(id){
    const user = uDB.getData(`/users/${id}`);
    console.log(user);
    if (user.password === password){
      return res.json(user);
    }
    return res.status(400).send({msg: "Wrong password"});
  }
  return res.status(400).send({msg: "User DNE"});
});

export default router;