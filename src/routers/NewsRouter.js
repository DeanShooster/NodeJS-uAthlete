const express = require("express");
const { GenericError, errorMessages } = require("../middlewares/ErrorHandler");
const { adminAuth } = require("../middlewares/authentication");

const routes = require("./config");
const News = require("../database/model/News");
const router = express.Router();

//--------------------------------------------------------------- GET REQUESTS --------------------------------------------------------------- //

router.get(`${routes.News}`, async (req, res, next) => {
  try {
    const newsFeed = await News.find().limit(8).select("-_id -__v");

    res.send(newsFeed);
  } catch (e) {
    next(e);
  }
});

//--------------------------------------------------------------- POST REQUESTS --------------------------------------------------------------- //

router.post(`${routes.News}`, adminAuth, async (req, res, next) => {
  try {
    const { latestNewsFeedUpdate } = req.body;
    if (!latestNewsFeedUpdate) return next(new GenericError(errorMessages.badRequest, 400));

    const latestNewsFeed = new News(latestNewsFeedUpdate);
    await latestNewsFeed.save();

    res.send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
