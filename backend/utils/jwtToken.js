// Create Token and Save in Cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Convert COOKIE_EXPIRE to a number to avoid issues
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 1; // Default to 1 day if undefined

  // Corrected expires option
  const options = {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;