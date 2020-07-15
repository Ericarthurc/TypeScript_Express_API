import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import chalk from 'chalk';

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

// Serve Static Build
if (process.env.FRONT_ENV === 'react') {
  app.use(express.static(path.join(__dirname, './frontend/react-web/build')));
}
if (process.env.FRONT_ENV === 'vue') {
  app.use(express.static(path.join(__dirname, './frontend/vue-web/build')));
}

// Mount routers
app.use('/api/v1/users', users);

// Catch all back to React Router
app.get('*', (req: express.Request, res: express.Response) => {
  if (process.env.FRONT_ENV === 'react') {
    res.sendFile(path.join(__dirname, './frontend/react-web/build/index.html'));
  }
  if (process.env.FRONT_ENV === 'vue') {
    res.sendFile(path.join(__dirname, './frontend/vue-web/build/index.html'));
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    chalk.blue.bold.underline(`Server running on port ${process.env.PORT}`)
  ),
    console.log(
      chalk.yellow.bold.underline(
        `Frontend environment: ${process.env.FRONT_ENV}`
      )
    );
});
