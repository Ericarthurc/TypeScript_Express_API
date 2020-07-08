import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
import './config/db';

// Route files
import users from './router/users';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Pass socket to req
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.io = io;
    next();
  }
);

//  Cors middlware
app.use(cors());

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/users', users);

// History mode for React Router
app.use(history());

// Serve Static React
app.use(express.static('./frontend/build'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
