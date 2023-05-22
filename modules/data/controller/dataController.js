const { Data } = require("../../../data_pb");
const dataModel = require("../model/dataModel");

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

    // console.log(dataMessages)

    const allData = new proto.AllData();
    allData.setAlldataList(dataMessages);
    const encodeData = allData.serializeBinary();
    console.log("serializeData===>", encodeData);

    const decodeData = proto.AllData.deserializeBinary(encodeData);
    console.log(decodeData.toObject());

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
