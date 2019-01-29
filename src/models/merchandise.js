import JsonDB from 'node-json-db';

const DB = new JsonDB("src/db/merchandiseDB", true, true);

const state = DB.getData("/");
state.items || DB.push(`/items`, []);

export default DB;