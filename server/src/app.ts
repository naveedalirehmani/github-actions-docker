import * as path from 'path';
import cors from 'cors';
import express from 'express';
import deserializeUser from './middlewares/deserializeUsers';
import cookieParser from 'cookie-parser';
import Api1 from './routes/api';

const app: express.Application = express();

app.use(cookieParser());
app.use(deserializeUser);

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}));

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/v1', Api1);

export = app;
