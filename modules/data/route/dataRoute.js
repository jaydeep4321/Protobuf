const dataController = require("../controller/dataController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(dataController.getAllData)
  .post(dataController.createData);

router.route("/allData").get(dataController.findAll);

router.route("/postData").post(dataController.createDataJSON);

module.exports = router;
