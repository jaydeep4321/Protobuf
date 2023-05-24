const { Data } = require("../../../data_pb");
const dataModel = require("../model/dataModel");

exports.createData = async (req, res, next) => {
  try {
    console.log("post api called!!!");
    const encodedData = req.body;

    // console.log("encodedData ==>", encodedData);
    let binaryMessage = Object.values(encodedData);
    // binaryMessage = new Uint8Array(binaryMessage);
    binaryMessage = binaryMessage[0];
    binaryMessage = new Uint8Array(binaryMessage);

    console.log("binaryMessage ==>", binaryMessage);
    const data = proto.Data.deserializeBinary(binaryMessage);

    // console.log("desrializeBinary ==>", data);

    const name = data.getName();
    const age = data.getAge();
    const description = data.getDescription();

    const document = new dataModel({
      name,
      age,
      description,
    });

    // console.log(document);

    await document.save();

    res.status(201).json({
      error: false,
      message: "Data created successfully",
      data: document,
    });
  } catch (error) {
    console.error("Error creating data:", error);
    res
      .status(500)
      .json({ error: true, message: "An error occurred while creating data" });
  }
};

exports.getAllData = async (req, res, next) => {
  try {
    let documents = await dataModel.find();

    const dataMessages = documents.map((document) => {
      // console.log(document._id.toString())
      const data = new proto.Data();
      // data.setId(parseInt(document._id.toString(), 16));
      data.setId(document._id.toString());
      data.setName(document.name);
      data.setAge(document.age);
      data.setDescription(document.description);

      // console.log(data);
      return data;
    });

    // console.log(dataMessages);

    const allData = new proto.AllData();
    allData.setAlldataList(dataMessages);
    let encodeData = allData.serializeBinary();
    // console.log("serializeData===>", encodeData);

    // console.log(encodeData);

    // const decodeData = proto.AllData.deserializeBinary(encodeData);
    // console.log(decodeData.toObject());
    console.log("Befor buffer ==>", encodeData);

    encodeData = Buffer.from(encodeData);

    console.log("Buffer ==>", encodeData);

    // encodeData = new Uint8Array(encodeData);

    encodeData = Object.values(encodeData);

    // console.log();
    // const decodeData = proto.AllData.deserializeBinary(encodeData);
    // console.log(decodeData.toObject());

    res.status(200).send(encodeData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    let documents = await dataModel.find();

    res.status(200).json({ data: documents });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};

exports.createDataJSON = async (req, res, next) => {
  try {
    console.log("post api called!!!");

    const document = new dataModel({
      name: req.body.name,
      age: req.body.age,
      description: req.body.description,
    });

    console.log(document);

    await document.save();

    res.status(201).json({
      error: false,
      message: "Data created successfully",
      data: document,
    });
  } catch (error) {
    console.error("Error creating data:", error);
    res
      .status(500)
      .json({ error: true, message: "An error occurred while creating data" });
  }
};

//===================================================//
// exports.createData = async (req, res, next) => {
//   try {
//     const { name, age, description } = req.body;

//     const data = new Data();
//     // data.name = name;
//     data.setName(name);
//     // data.age = age;
//     data.setAge(age);
//     // data.description = description;
//     data.setDescription(description);

//     // const encodedData = Data.serializeBinary(data).finish();
//     const encodedData = Buffer.from(data.serializeBinary());
//     console.log(encodedData);

//     await DataModel.create({ protobufData: encodedData });

//     res.status(200).json({ message: "Data stored successfully" });
//   } catch (error) {
//     console.error("Error storing data:", error);
//     res.status(500).json({ message: "An error occurred while storing data" });
//   }
// };
