var isArray = require("is_array"),
    isString = require("is_string"),
    SPLITER = require("./SPLITER");


var MimeTypePrototype;


module.exports = MimeType;


function MimeType(types, exts) {
    this.types = isArray(types) ? types : (isString(types) ? types.split(SPLITER) : []);
    this.type = this.types[0];
    this.exts = isArray(exts) ? exts : (isString(exts) ? exts.split(SPLITER) : []);
    this.ext = this.exts[0];
}
MimeTypePrototype = MimeType.prototype;

MimeTypePrototype.toJSON = function(json) {
    var exts, types, jsonExts, jsonTypes, i, il;

    json || (json = {});

    exts = this.exts;
    types = this.types;
    jsonExts = json.exts || (json.exts = []);
    jsonTypes = json.types || (json.types = []);

    if (jsonExts.length) {
        jsonExts.length = 0;
    }

    for (i = 0, il = exts.length; i < il; i++) {
        jsonExts.push(exts[i]);
    }

    if (jsonTypes.length) {
        jsonTypes.length = 0;
    }

    for (i = 0, il = types.length; i < il; i++) {
        jsonTypes.push(types[i]);
    }

    json.type = this.type;
    json.ext = this.ext;

    return json;
};

MimeTypePrototype.fromJSON = function(json) {
    var exts = this.exts,
        types = this.types,
        jsonExts = json.exts || (json.exts = []),
        jsonTypes = json.types || (json.types = []),
        i, il;

    if (types.length) {
        types.length = 0;
    }

    for (i = 0, il = jsonTypes.length; i < il; i++) {
        types.push(jsonTypes[i]);
    }

    if (exts.length) {
        exts.length = 0;
    }

    for (i = 0, il = jsonExts.length; i < il; i++) {
        exts.push(jsonExts[i]);
    }

    this.type = json.type;
    this.ext = json.ext;

    return this;
};
