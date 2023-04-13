import bcrypt from 'bcrypt';

export const validatepwd = (req, res, next) => {
  try {
    const { password } = req.body;

    if (password.length < 8)
      throw new Error(`Password must be atleast 8 chararters long`);
    else if (password.length > 16)
      throw new Error(`Password can't exceed 16 characters`);

    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const encryptpwd = async (req, res, next) => {
  try {
    const { password } = req.body;

    // generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // change the given password
    req.body.password = hashedPassword;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

