const { GenericError, errorMessages } = require("./ErrorHandler");

const adminAuth = async (req, res, next) => {
  try {
    const { adminPassword } = req.body;
    if (!adminPassword) return next(new GenericError(errorMessages.badRequest, 404));
    if (adminPassword !== process.env.ADMIN_PASSWORD) return next(new GenericError(errorMessages.noAuth, 401));
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { adminAuth };
