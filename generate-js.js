const protobuf = require("protobufjs");
const fs = require("fs");

// Load the Protobuf schema file
const schema = fs.readFileSync("data.proto", "utf8");

// Create a root object to hold the loaded schema
const root = protobuf.parse(schema, { keepCase: true }).root;

// Generate the JavaScript code
const generatedCode = root.toJS({ keepCase: true });

// Write the generated code to a file
fs.writeFileSync("data_pb.js", generatedCode);
