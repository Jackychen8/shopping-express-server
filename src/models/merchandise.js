import JsonDB from 'node-json-db';

const DB = new JsonDB("src/db/merchandiseDB", true, true);

export default DB;