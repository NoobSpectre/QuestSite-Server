import User from '../../models/User.js';
import bcrypt from 'bcrypt';

/* REGISTRATION - verifies if user already exists by searching email in db */
export const isNewUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user_1 = await User.findOne({ username });
    if (user_1)
      return res.status(400).json({
        success: false,
        message: `Username already taken!`,
      });
    
    const user_2 = await User.findOne({ email });
    if (user_2)
      return res.status(400).json({
        success: false,
        message: `Email address already exists!`,
      });

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* LOGIN - verifies user credentials before login */
export const verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: `User not found!`,
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: `Password mismatch!`,
      });

    const { _token: token } = req.cookies;
    if (token)
      return res.status(401).json({
        success: false,
        message: `You're already logged in!`,
      });

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
