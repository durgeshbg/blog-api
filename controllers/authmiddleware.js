const asyncHandler = require('express-async-handler');

exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.admin) next();
  else res.status(401).json({ error: 'Not an admin' });
});
