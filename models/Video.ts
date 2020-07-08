import mongoose, { Schema } from 'mongoose';

import { IVideo } from '../@types/models';

const VideoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // description: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    path: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { autoCreate: true, timestamps: true }
);

export default mongoose.model<IVideo>('Video', VideoSchema);
