export const errorMiddleware = (err, req, res) => {
  const message = err.message || 'Internal Server Error';
  const statusCode = err.statusCode || 500;
  
  return res.status(err.statusCode).json({
    success: false,
    message: err.emessage,
  });
};
