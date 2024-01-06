const { GenericError, errorMessages } = require("./ErrorHandler");
const { isPasswordValid, allFieldsDefined, isValidEmail, isValidName, isValidGender, isValidWeight, isValidHeight } = require("../utils/Validations");

const registerValidations = async (req, res, next) => {
  try {
    const { email, password, rPassword, name, gender, weight, height } = req.body;
    if (
      allFieldsDefined(req.body) &&
      isValidEmail(email) &&
      isPasswordValid(password) &&
      password === rPassword &&
      isValidName(name) &&
      isValidGender(gender) &&
      isValidWeight(weight) &&
      isValidHeight(height)
    ) {
      req.newAthlete = {
        email,
        password,
        personalDetails: {
          name,
          gender: gender === "Male",
          weight,
          height,
        },
      };
      return next();
    }
    return next(new GenericError(errorMessages.badRequest, 400));
  } catch (error) {
    next(error);
  }
};

const loginValidations = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (allFieldsDefined(req.body) && isValidEmail(email) && isPasswordValid(password)) return next();
    return next(new GenericError(errorMessages.badRequest, 400));
  } catch (error) {
    next(error);
  }
};

module.exports = { registerValidations, loginValidations };
