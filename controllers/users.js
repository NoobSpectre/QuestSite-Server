import {
  uploadToS3,
  downloadFromS3,
  deleteFromS3,
} from '../database/storage.js';
import User from '../models/User.js';
import { auth } from '../utils/auth.js';

/* CREATE USER */
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password,
    });

    auth(user, res, 'Registered successfully!', 201);
  } catch (error) {
    const message = error.message.split(':').slice(-1)[0].trim();
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

/* LOGIN USER */
export const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    auth(user, res, 'Login successfully!', 201);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET USER PROFILE */
export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    res.status(201).json({
      success: true,
      message: `Welcome to your profile!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* LOGOUT USER */
export const logoutUser = (req, res) => {
  try {
    res
      .status(200)
      .cookie('_token', '', {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: 'Logout successfullY!',
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* UPDATE USER PROFILE */

// UPDATE USERNAME
export const patchUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { username: _username } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { username: _username },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Updated successfully!',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE GENDER
export const patchGender = async (req, res) => {
  try {
    const { username } = req.params;
    const { gender } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { gender },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: `Gender updated!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE BIRTHDAY
export const patchBirthday = async (req, res) => {
  try {
    const { username } = req.params;
    const { birthday } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { birthday },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: `Birthday updated!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE LOCATION
export const patchLocation = async (req, res) => {
  try {
    const { username } = req.params;
    const { location } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { location },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: `Location updated!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TOTAL_SOLUTIONS
export const patchTotalSolutions = async (req, res) => {
  try {
    const { username } = req.params;
    const { total_solutions } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { total_solutions: total_solutions + 1 },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: `Number of solutions incremented!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TOTAL_DISCUSSIONS
export const patchTotalDiscussions = async (req, res) => {
  try {
    const { username } = req.params;
    const { total_discussions } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { total_discussions: total_discussions + 1 },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: `Number of discussions incremented!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TOTAL_SOLVED
export const patchTotalSolved = async (req, res) => {
  try {
    const { username } = req.params;
    const { total_solved } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { total_solved: total_solved + 1 },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: `Number of discussions incremented!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE AVATAR
export const patchAvatar = async (req, res) => {
  try {
    const { username } = req.params;

    if (req.file === 'undefined' || req.file === null)
      return res.status(201).json({
        success: true,
        message: 'Removed successfully!',
      });

    const { key: avatar, error } = await uploadToS3(username, req.file);

    if (error) throw new Error(error.message);

    const user = await User.findOneAndUpdate(
      { username },
      { avatar },
      { new: true }
    );

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Uploaded successfully!',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET AVATAR
export const getAvatar = async (req, res) => {
  try {
    const { username } = req.params;
    const { avatar } = await User.findOne({ username });

    if (!avatar)
      return res.status(201).json({
        success: true,
        message: 'Avatar received successfully!',
        url: '',
      });

    const { url, error } = await downloadFromS3(avatar);

    if (error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });

    res.status(201).json({
      success: true,
      message: 'Avatar received successfully!',
      url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE AVATAR
export const deleteAvatar = async (req, res) => {
  try {
    const { username } = req.params;
    const { avatar } = await User.findOne({ username });

    if (!avatar)
      return res.status(201).json({
        success: true,
        message: 'Avatar received successfully!',
        url: '',
      });

    const { key, error } = await deleteFromS3(avatar);

    if (error)
      return res.status(500).json({
        success: false,
        message: error.message,
      });

    const user = await User.findOneAndUpdate(
      { username },
      { avatar: key },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Removed successfully!',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* PATCH USER PROBLEMS - either solved or attempted */
// export const patchProblem = async (req, res) => {
//   try {
//     const { username, pid, status } = req.body;
//     const user = await 
    
//   } catch (error) {}
// };
