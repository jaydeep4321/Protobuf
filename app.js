const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Data } = require("./data_pb");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();


app.use(express.json({ limit: "10kb" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create a Mongoose model for the protobuf data
const DataModel = mongoose.model("Data", {
  protobufData: Buffer,
});

app.post("/api/data", async (req, res) => {
  try {
    // Extract data from the request body
    const { id, name, age } = req.body;

    // Create a new Data message
    const data = new Data();
    data.id = id;
    data.name = name;
    data.age = age;

    // Encode the Data message to binary format
    const encodedData = Data.encode(data).finish();

    // Store the encoded data in MongoDB using Mongoose
    await DataModel.create({ protobufData: encodedData });

    res.status(200).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ message: "An error occurred while storing data" });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    // Fetch all the documents from the DataModel
    const documents = await DataModel.find();

    // Convert the fetched documents to an array of Data messages
    const dataMessages = documents.map((document) =>
      Data.decode(document.protobufData)
    );

    res.status(200).json({ data: dataMessages });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
});

app.all("*", (req, res, next) => {
  res.status(404).json({ message: `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;