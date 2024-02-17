const express = require("express");
const { auth } = require("../middlewares/authentication");
const { MaleMetaData, FemaleMetaData, ProMaleMetaData, ProFemaleMetaData } = require("../database/data/metaData");

const routes = require("./config");
const router = express.Router();

//--------------------------------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get(`${routes.Athlete}/MetaProData`, auth, async (req, res, next) => {
  try {
    const { personalDetails } = req.athlete;
    const { gender } = personalDetails;

    const metaProData = { metaData: gender ? MaleMetaData : FemaleMetaData, proData: gender ? ProMaleMetaData : ProFemaleMetaData };

    res.send(metaProData);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
