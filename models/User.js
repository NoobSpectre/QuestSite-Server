import mongoose, { Schema, model } from 'mongoose';

// const limit_todo = _limit => value => value.length <= _limit;
const verifyUsername = () => value =>
  !value.includes('?') &&
  !value.includes('/') &&
  !value.includes('\\') &&
  !value.includes('%');

// const _sc = '\\';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, `Username can't be empty`],
      unique: true,
      maxLength: [20, `Username can't exceed 20 characters`],
      trim: true,
      validate: [
        {
          validator: _name => !_name.includes(' '),
          message: 'Username can be atmost one word!',
        },
        {
          validator: verifyUsername(),
          message: `These special characters '?', '/', '%' and 'backslash' are not allowed!`,
        },
      ],
    },
    email: {
      type: String,
      required: [true, `Email address can't be empty`],
      unique: true,
      trim: true,
      validate: {
        validator: _email =>
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(_email),
        message: 'Invalid email address',
      },
    },
    password: {
      type: String,
      required: [true, `Provide a password!`],
      trim: true,
    },
    gender: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    birthday: {
      type: String,
      default: '',
    },
    location: {
      country: { type: String, trim: true, default: '' },
      state: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: '' },
    },
    total_solutions: {
      type: Number,
      default: 0,
    },
    total_discussions: {
      type: Number,
      default: 0,
    },
    total_solved: {
      type: Number,
      default: 0,
    },
    // reputation: {
    //   type: Number,
    //   default: 0,
    // },
    problems: [{ pid: Number, status: String, difficulty: String }],
    // todo: {
    //   type: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Problem',
    //     },
    //   ],
    //   validate: {
    //     validator: limit_todo(3),
    //     message: 'Remove entries before inserting any more!!',
    //   },
    // },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
