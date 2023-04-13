import multer from 'multer';

const _upload = () => {
  const storage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only images of .png, .jpg and .jpeg format are allowed!'));
    }
  };

  return multer({ storage, fileFilter }).single('avatar');
};

export const uploadAvatar = (req, res, next) => {
  const upload = _upload();
  return upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Fieldname mismatch - should be 'avatar'`,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    return next();
  });
};
