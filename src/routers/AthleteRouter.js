const express = require("express");
const { auth } = require("../middlewares/authentication");

const routes = require("./config");
const router = express.Router();

//--------------------------------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get(`${routes.Athlete}/MetaProData`, auth, async (req, res, next) => {
  try {
    console.log(req.athlete);

    const metaProData = {
      athleteData: {
        strength: 150,
        endurance: 50,
        stamina: 100,
      },
      metaData: {
        strength: 150,
        endurance: 150,
        stamina: 150,
      },
      proData: {
        strength: 200,
        endurance: 200,
        stamina: 200,
      },
    };

    res.send(metaProData);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
