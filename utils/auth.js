import jwt from 'jsonwebtoken';

export const auth = (user, res, message, statusCode) => {
  //tokenize to login user at the same time after registration
  const _token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(statusCode)
    .cookie('_token', _token, {
      maxAge: 1000 * 60 * 60, // 1 hour cookie time i.e. login time
      // if changed, also change ttl value at line 38 in 'client/src/contexts/userAuth.js'
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
    });
};
