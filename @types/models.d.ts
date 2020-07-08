import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  tokens: Array<Token>;

  // methods
  generateAuthToken(): Promise<string>;
}

interface Token {
  token: string;
}

export interface SUser extends Model<IUser> {
  // statics
  findByCredentials(
    username: IUser['username'],
    password: IUser['password']
  ): Promise<IUser>;
}

export interface IVideo extends Document {
  title: string;
  path: string;
  videoId: string;
  owner: mongoose.Schema.Types.ObjectId;
}
