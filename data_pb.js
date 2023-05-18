/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Data = (function() {

    /**
     * Properties of a Data.
     * @exports IData
     * @interface IData
     * @property {number|null} [id] Data id
     * @property {string|null} [name] Data name
     * @property {number|null} [age] Data age
     */

    /**
     * Constructs a new Data.
     * @exports Data
     * @classdesc Represents a Data.
     * @implements IData
     * @constructor
     * @param {IData=} [properties] Properties to set
     */
    function Data(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Data id.
     * @member {number} id
     * @memberof Data
     * @instance
     */
    Data.prototype.id = 0;

    /**
     * Data name.
     * @member {string} name
     * @memberof Data
     * @instance
     */
    Data.prototype.name = "";

    /**
     * Data age.
     * @member {number} age
     * @memberof Data
     * @instance
     */
    Data.prototype.age = 0;

    /**
     * Creates a new Data instance using the specified properties.
     * @function create
     * @memberof Data
     * @static
     * @param {IData=} [properties] Properties to set
     * @returns {Data} Data instance
     */
    Data.create = function create(properties) {
        return new Data(properties);
    };

    /**
     * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
     * @function encode
     * @memberof Data
     * @static
     * @param {IData} message Data message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.age != null && message.hasOwnProperty("age"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.age);
        return writer;
    };

    /**
     * Encodes the specified Data message, length delimited. Does not implicitly {@link Data.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Data
     * @static
     * @param {IData} message Data message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @function decode
     * @memberof Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Data();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.age = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Data message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Data message.
     * @function verify
     * @memberof Data
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Data.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.age != null && message.hasOwnProperty("age"))
            if (!$util.isInteger(message.age))
                return "age: integer expected";
        return null;
    };

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Data
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Data} Data
     */
    Data.fromObject = function fromObject(object) {
        if (object instanceof $root.Data)
            return object;
        var message = new $root.Data();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.name != null)
            message.name = String(object.name);
        if (object.age != null)
            message.age = object.age | 0;
        return message;
    };

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Data
     * @static
     * @param {Data} message Data
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Data.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = 0;
            object.name = "";
            object.age = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.age != null && message.hasOwnProperty("age"))
            object.age = message.age;
        return object;
    };

    /**
     * Converts this Data to JSON.
     * @function toJSON
     * @memberof Data
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Data.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Data;
})();

module.exports = $root;
