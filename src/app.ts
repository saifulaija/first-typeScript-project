import express, { Application } from 'express';
import cors from 'cors';
import globalHandler from './app/middleware/globalHandler';
import router from './app/routes';
import notFund from './app/middleware/notFount';

const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1/', router);

app.use(globalHandler);

//not fund route--------
app.use(notFund);

// console.log(process.cwd())
export default app;
