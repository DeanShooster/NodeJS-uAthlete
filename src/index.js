// DB Connections
require("./database/mongooseConnection");

// Dependencies
const cors = require("cors");
const express = require("express");

const { ErrorHandler } = require("./middlewares/ErrorHandler");
const app = express();
const port = process.env.PORT || 4000;

// Routers Declarations
const newsRouter = require("./routers/NewsRouter");
const authRouter = require("./routers/AuthRouter");
const notificationRouter = require("./routers/NotificationRouter");

// Cors white list and JSON
app.use(cors());
app.use(express.json());

// Routers
app.use(newsRouter);
app.use(authRouter);
app.use(notificationRouter);
app.use(ErrorHandler);

app.listen(port, async () => console.log(`Server is online on Port: ${port}`));
