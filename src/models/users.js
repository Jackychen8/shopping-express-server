import JsonDB from 'node-json-db';

const DB = new JsonDB("src/db/usersDB", true, true);

// Initialize
const state = DB.getData("/");
state.used || DB.push("/used", {});
state.users || DB.push("/users", {});

export default DB;