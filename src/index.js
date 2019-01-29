import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import cors from 'cors';
app.use(cors());

app.use('/users', routes.user);
app.use('/merchandise', routes.merchandise);
// TODO: separate auth out into independent service to allow for independent scaling
app.use('/auth', routes.auth);

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));

export default app;
