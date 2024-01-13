const express = require("express");
const bcrypt = require("bcrypt");
const { registerValidations, loginValidations } = require("../middlewares/validations");
const { GenericError, errorMessages } = require("../middlewares/ErrorHandler");
const { auth } = require("../middlewares/authentication");

const routes = require("./config");
const Athlete = require("../database/model/Athlete");
const router = express.Router();

//--------------------------------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get(`${routes.Auth}/Validation`, auth, async (req, res, next) => {
  try {
    const athlete = req.athlete;

    const athleteObject = athlete.toObject();
    delete athleteObject.password;
    delete athleteObject._id;

    res.send({ athlete: athleteObject });
  } catch (error) {
    next(error);
  }
});

//--------------------------------------------------------------- POST REQUESTS --------------------------------------------------------------- //

router.post(`${routes.Auth}/Register`, registerValidations, async (req, res, next) => {
  try {
    const newAthlete = new Athlete(req.newAthlete);
    const token = await newAthlete.generateToken();

    await newAthlete.save();

    const athleteObject = newAthlete.toObject();
    delete athleteObject.password;
    delete athleteObject._id;
    delete athleteObject.__v;

    res.send({ token, athlete: athleteObject });
  } catch (error) {
    next(error);
  }
});

router.post(`${routes.Auth}/Login`, loginValidations, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const athlete = await Athlete.findOne({ email });
    if (!athlete) return next(new GenericError(errorMessages.noAuth, 401));

    const isMatch = bcrypt.compare(password, athlete.password);
    if (!isMatch) return next(new GenericError(errorMessages.noAuth, 401));

    const token = await athlete.generateToken();

    const athleteObject = athlete.toObject();
    delete athleteObject.password;
    delete athleteObject._id;
    delete athleteObject.__v;

    res.send({ token, athlete: athleteObject });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
