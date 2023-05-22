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
    const encodedData = Buffer.from(data.serializeBinary());
    console.log(encodedData)

    await DataModel.create({ protobufData: encodedData });

    res.status(200).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ message: "An error occurred while storing data" });
  }
};


// exports.getAllData = async (req, res, next) => {
//   try {
//     const documents = await DataModel.find();
//     console.log(documents);


//     const dataMessages = documents.map((document) => {
//       const data = new proto.Data();
//       data.setId(document._id.toString()); // Use setId instead of setName for the _id field
//       data.setName(document.name);
//       data.setAge(document.age);
//       data.setDescription(document.description);

//       return data;
//     });

//     console.log(dataMessages)
//     const allData = new proto.AllData();
//     allData.setAlldataList(dataMessages);
//     const encodeData = allData.serializeBinary();

//     const decodeData = proto.AllData.deserializeBinary(encodeData);
//     console.log(decodeData.toObject());

//     res.set("Content-Type", "application/octet-stream");
//     res.status(200).json({ data: encodeData });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "An error occurred while fetching data" });
//   }
// };



exports.getAllData = async (req, res, next) => {
  try {
    let documents = await DataModel.find();

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

    console.log(dataMessages)

    const allData = new proto.AllData();
    allData.setAlldataList(dataMessages);
    const encodeData = allData.serializeBinary();
    console.log(encodeData);

    const decodeData = proto.AllData.deserializeBinary(encodeData);
    console.log(decodeData.toObject());

    res.status(200).json({ data: encodeData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};



//==================== for reference =====================//

// exports.getAllData = async (req, res, next) => {
//   try {
//     let documents = await DataModel.find();

//     // const dataMessages = documents.map((document) => {
//     //   const data = Data.deserializeBinary(document.protobufData);
//     //   return data.toObject();
//     // });
//     // documents = [JSON.stringify(documents)];
//     // console.log(documents);
//     // documents = documents.toJSON();

//     const dataMessages = documents.map((document) => {
//       const data = new proto.Data();
//       data.setName(document.name);
//       data.setAge(document.age);
//       data.setDescription(document.description);

//       // console.log(data);
//       return data;
//     });

//     // documents = documents.toJSON();
//     // console.log(documents);
//     // const data = new Data();

//     // data.setName(documents.name);
//     // data.setAge(documents.age);
//     // data.setDescription(documents.description);

//     // console.log(dataMessages);

//     const allData = new proto.AllData();
//     allData.setAlldataList(dataMessages);
//     const encodeData = allData.serializeBinary();
//     console.log(encodeData);

//     const decodeData = proto.AllData.deserializeBinary(encodeData);
//     // console.log(decodeData.toObject());

//     res.status(200).json({ data: encodeData });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ message: "An error occurred while fetching data" });
//   }
// };
