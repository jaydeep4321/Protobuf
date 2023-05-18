const { Data } = require("../../../data_pb");
const DataModel = require("../model/dataModel");

exports.createData = async (req, res, next) => {
  try {
    const { name, age, description } = req.body;

    const data = new Data();
    // data.name = name;
    data.setName(name);
    // data.age = age;
    data.setAge(age);
    // data.description = description;
    data.setDescription(description);

    // const encodedData = Data.serializeBinary(data).finish();
    const encodedData = data.serializeBinary();

    await DataModel.create({ protobufData: encodedData });

    res.status(200).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ message: "An error occurred while storing data" });
  }
};

exports.getAllData = async (req, res, next) => {
  try {
    const documents = await DataModel.find();

    const dataMessages = documents.map((document) =>
      Data.deserializeBinary(document.protobufData)
    );

    res.status(200).json({ data: dataMessages });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};
