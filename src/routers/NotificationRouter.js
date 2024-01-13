const express = require("express");
const { adminAuth, auth } = require("../middlewares/authentication");

const routes = require("./config");
const Athlete = require("../database/model/Athlete");
const router = express.Router();

//--------------------------------------------------------------- POST REQUESTS --------------------------------------------------------------- //

router.post(`${routes.Notifications}`, adminAuth, async (req, res, next) => {
  try {
    const { notification } = req.body;

    await Athlete.updateMany(
      {},
      {
        $set: { "notifications.isRead": false },
        $push: { "notifications.messages": notification },
      }
    );

    res.send({});
  } catch (error) {
    next(error);
  }
});

//--------------------------------------------------------------- PATCH REQUESTS --------------------------------------------------------------- //

router.patch(`${routes.Notifications}/Read`, auth, async (req, res, next) => {
  try {
    const { athlete } = req;

    athlete.notifications.isRead = true;

    await athlete.save();

    res.send({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
