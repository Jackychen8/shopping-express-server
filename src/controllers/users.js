import DB from '../models';

const uDB = DB.users;

export const getUser = (req, res) => res.json(req.userObj);

export const createUser = (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if(uDB.getData("/used")[email]) {
    return res.status(400).json({"msg": "E-mail is already used."});
  }
  const id = uuidv4();
  const info = { id, email, password, firstName, lastName, history: [], cart: {} };
  uDB.push(`/used/${email}`, true);
  uDB.push(`/users/${id}`, info);
  return res.json(info);
};

export const getHistory = (req, res) => {
  const { history } = req.userObj;
  return res.json({ history });
};

export const updateHistory = (req, res) => {
  // Check out/empty cart
  // Add cart checkout event to history
  const { userId } = req.params;
  const { info } = req.body;
  const { cart } = req.userObj;

  // Many DBs generate an ID partially based on time so no need for manual Date.now()
  // in real implementation
  const entry = { timestamp: Date.now(), info, cart };
  uDB.push(`/users/${userId}/history`, entry, false);
  uDB.push(`/users/${userId}/cart`, {});
  return res.json(entry);
};

export const getCart = (req, res) => {
  const { cart } = req.userObj;
  return res.json({ cart });
};

export const updateCart = (req, res) => {
  // Add singular items to cart
  const { userId } = req.params;
  const { action, item } = req.body;// action can be add, del
  const path = `/users/${userId}/cart/${item.id}`;
  const prevItem = req.body.userObj.cart[item.id];

  if(prevItem) {
    if (action === "del"){
        prevItem.quantity--;
        if(prevItem.quantity){
          uDB.push(path, prevItem);
        }else{
          uDB.delete(path);
        }
    } else {// Add by default
      prevItem.quantity++;
      uDB.push(path, prevItem);
    }
  } else {
    item.quantity = 1;
    uDB.push(path, item);
  }

  let entry;
  try {
    entry = uDB.getData(path);
  } catch(e) {
    entry = {};
  }
  res.json(entry);
};

export const loadUser = (req, res, next, id) => {
  req.userObj = uDB.getData(`/users/${id}`);
  next();
}
