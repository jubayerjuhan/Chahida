module.exports = (statusCode, user, res) => {
  const token = user.getJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });

}