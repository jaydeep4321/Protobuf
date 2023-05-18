const mongoose = require("mongoose");

const DataModel = mongoose.model("Data", {
  //   protobufData: [Uint8Array],
  protobufData: Buffer,
});

module.exports = DataModel;
