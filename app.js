const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const dataRouter = require("./modules/data/route/dataRoute");
const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "10kb" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/data", dataRouter);

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ message: `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;
