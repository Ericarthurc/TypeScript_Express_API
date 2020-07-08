declare global {
  namespace Express {
    interface Request {
      io: SocketIO.Server;
      user: any;
      token: string;
    }
  }
}

export {};
