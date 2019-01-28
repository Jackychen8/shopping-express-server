import JsonDB from 'node-json-db';

const DB = new JsonDB("src/db/usersDB", true, true);

export default DB;