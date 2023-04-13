import User from '../../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user)
      return res.status(401).json({
        success: false,
        message: `User not found`,
      });

    const { _token: token } = req.cookies;
    if (!token)
      return res.status(401).json({
        success: false,
        message: `Session expired, login again!`,
      });

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
