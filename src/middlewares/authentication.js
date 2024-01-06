const { GenericError, errorMessages } = require("./ErrorHandler");
const Athlete = require("../database/model/Athlete");
const jwt = require("jsonwebtoken");

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

const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, process.env.SECRET);

    const athlete = await Athlete.findOne({ email: decoded.email });
    if (!athlete) return next(new GenericError(errorMessages.noAuth, 401));

    req.athlete = athlete;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { adminAuth, auth };
