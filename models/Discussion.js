import mongoose, { Schema, model } from 'mongoose';

const discussionSchema = new Schema({
  username: {
    type: String,
    required: [true, `Username can't be empty`],
    maxLength: [20, `Username can't exceed 20 characters`],
    trim: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  reply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion',
    },
  ],
});

const Discussion = model('Discussion', discussionSchema);

export default Discussion;
