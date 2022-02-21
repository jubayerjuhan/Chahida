module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something Went Wrong'

  res.status(statusCode).json({
    success: false,
    message
  })
}