import { Schema, model } from 'mongoose';

const problemSchema = new Schema({
  pid: {
    type: Number,
  },
  p_desc: {
    type: String,
    required: true,
    trim: true,
  },
  p_type: {
    type: String,
    required: true,
  },
  options: [],
  answer: {
    type: String,
    required: true,
    trim: true,
  },
  field: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
  },
  topics: [String],
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  // number of submissions and accepts of this question to calculate the acceptance rate
  submissions: {
    type: Number,
    default: 0,
  },
  accepted: {
    type: Number,
    default: 0,
  },
  discussions: [
    {
      comment: String,
      by: String,
    },
  ],
});

const Problem = model('Problem', problemSchema);

export default Problem;
