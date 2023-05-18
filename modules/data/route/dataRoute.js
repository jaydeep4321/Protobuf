const dataController = require("../controller/dataController");
const express = require("express");

const router = express.Router();

router
  .route("/data")
  .post(dataController.createData)
  .get(dataController.getAllData);

module.exports = router;
