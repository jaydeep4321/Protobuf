const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//   protobufData: Buffer,
// });

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String }
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;