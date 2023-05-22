const dataController = require("../controller/dataController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .post(dataController.createData)
  .get(dataController.getAllData);

router.route("/allData").get(dataController.findAll);

module.exports = router;
