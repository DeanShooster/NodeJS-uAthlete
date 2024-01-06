const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  feed: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("NewsFeed", newsSchema);
module.exports = News;
