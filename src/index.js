import 'dotenv/config';
import express from 'express';

const app = express();

app.listen(3001, () => console.log("App listening on port 3001"),);


// console.log(process.env.SECRET);


