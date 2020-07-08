import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { IUser, SUser } from '../@types/models';
import Video from './Video';

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: {
        validator: (v: IUser['password']) => {
          return !v.toLowerCase().includes('password');
        },
        message: (props) => `${props.value} can't contain 'password`,
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { autoCreate: true, timestamps: true }
);

// virtual
UserSchema.virtual('video', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'owner',
});

// custom method that cleans up the object being sent back to the client
UserSchema.methods.toJSON = function (this: IUser) {
  const user = this;
  const userObject = user.toObject();

  // delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// methods are available on the instances
UserSchema.methods.generateAuthToken = async function (this: IUser) {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: '2d',
    }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// statics are availble on the models
UserSchema.statics.findByCredentials = async (
  username: IUser['username'],
  password: IUser['password']
) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  console.log(password);
  console.log(user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// hook: hash the plain text password before saving
UserSchema.pre('save', async function (this: IUser, next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// hook: delete user video when user is removed
UserSchema.pre('remove', async function (this: IUser, next) {
  const user = this;
  await Video.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model<IUser, SUser>('User', UserSchema);
export default User;
