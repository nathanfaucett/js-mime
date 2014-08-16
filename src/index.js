var Hash = require("hash"),
    utils = require("utils");


var SPLITER = /[ ,]+/,
    REPLACER = /.*[\.\/\\]/,
    TYPE_REPLACER = /;[(.*)\S\s]+/;


function MimeType(types, exts) {
    this.types = utils.isArray(types) ? types : (utils.isString(types) ? types.split(SPLITER) : []);
    this.type = this.types[0];
    this.exts = utils.isArray(exts) ? exts : (utils.isString(exts) ? exts.split(SPLITER) : []);
    this.ext = this.exts[0];
}

MimeType.prototype.toJSON = function(json) {
    json || (json = {});
    var exts = this.exts,
        types = this.types,
        jsonExts = json.exts || (json.exts = []),
        jsonTypes = json.types || (json.types = []),
        i, il;

    if (jsonExts.length) jsonExts.length = 0;
    for (i = 0, il = exts.length; i < il; i++) jsonExts.push(exts[i]);

    if (jsonTypes.length) jsonTypes.length = 0;
    for (i = 0, il = types.length; i < il; i++) jsonTypes.push(types[i]);

    json.type = this.type;
    json.ext = this.ext;

    return json;
};

MimeType.prototype.fromJSON = function(json) {
    var exts = this.exts,
        types = this.types,
        jsonExts = json.exts || (json.exts = []),
        jsonTypes = json.types || (json.types = []),
        i, il;

    if (types.length) types.length = 0;
    for (i = 0, il = jsonTypes.length; i < il; i++) types.push(jsonTypes[i]);

    if (exts.length) exts.length = 0;
    for (i = 0, il = jsonExts.length; i < il; i++) exts.push(jsonExts[i]);

    this.type = json.type;
    this.ext = json.ext;

    return this;
};


function Mime() {

    this.types = new Hash("ext");
    this.extensions = new Hash("type");

    this.defaultType = "text/plain";
    this.defaultExtension = "txt";

    this.defaults();
}

Mime.prototype.defaults = function() {
    if (this.types.length > 0 || this.extensions.length > 0) this.clear();

    this.register("*/*", "*");

    this.register("text/html", "html htm xhtml");
    this.register("text/plain", "txt");
    this.register("application/javascript", "js");
    this.register("text/css", "css");

    this.register("image/svg+xml", "svg");
    this.register("application/x-font-ttf application/x-font-truetype", "ttf");
    this.register("application/x-font-opentype", "otf");
    this.register("application/font-woff", "woff wof");
    this.register("application/vnd.ms-fontobject", "eot");

    this.register("image/png", "png");
    this.register("image/jpeg", "jpeg jpg");
    this.register("image/gif", "gif");
    this.register("image/bmp", "bmp");
    this.register("image/x-icon", "ico");
    this.register("image/tiff", "tiff tif");

    this.register("video/mpeg", "mpg mpeg mpe");
    this.register("video/ogg", "ogv ogg");
    this.register("video/mp4", "mp4");

    this.register("audio/wav", "wav");
    this.register("audio/mpeg", "mpg mpeg");
    this.register("audio/ogg", "oga ogg");
    this.register("audio/mp3", "mp3");
    this.register("audio/mp4", "mp4");

    this.register("application/xml", "xml");

    this.register("application/json", "json");
    this.register("application/pdf", "pdf");
    this.register("application/zip", "zip");

    return this;
};

Mime.prototype.clear = function() {

    this.defaultType = "text/plain";
    this.defaultExtension = "txt";

    this.types.clear();
    this.extensions.clear();

    return this;
};

Mime.prototype.register = function(types, exts) {
    var mimeType = new MimeType(types, exts);

    this.types.push(mimeType);
    this.extensions.push(mimeType);

    return this;
};

Mime.prototype.unregister = function(exts) {
    exts = utils.isArray(exts) ? exts : (utils.isString(exts) ? exts.split(SPLITER) : []);
    var extensions = this.extensions,
        i = exts.length;

    while (i--) {
        if ((mimeType = extensions.get(exts[i]))) break;
    }

    if (mimeType) {
        extensions.remove(mimeType);
        this.types.remove(mimeType);
    }

    return this;
};

Mime.prototype.unregisterType = function(types) {
    types = utils.isArray(types) ? types : (utils.isString(types) ? types.split(SPLITER) : []);
    var thisTypes = this.thisTypes,
        i = types.length;

    while (i--) {
        if ((mimeType = thisTypes.get(types[i]))) break;
    }

    if (mimeType) {
        thisTypes.remove(mimeType);
        this.extensions.remove(mimeType);
    }

    return this;
};

Mime.prototype.lookUp = function(path, fallback) {
    var ext = path.replace(REPLACER, "").toLowerCase(),
        types = this.types,
        mimeType = this.types.get(ext),
        testMimeType, exts, i, j, jl;

    if (!mimeType) {
        for (i = types.length; i--;) {
            testMimeType = types[i];
            exts = testMimeType.exts;

            for (j = 0, jl = exts.length; j < jl; j++) {
                if (ext === exts[j]) {
                    mimeType = testMimeType;
                    break;
                }
            }
            if (mimeType) break;
        }
    }
    if (!mimeType && fallback === false) return null;

    return (mimeType && mimeType.type) || fallback || this.defaultType;
};

Mime.prototype.lookUpType = function(ext, fallback) {
    ext = ext.replace(REPLACER, "").toLowerCase();
    var mimeType = this.types.get(ext);
    if (!mimeType && fallback === false) return null;

    return (mimeType && mimeType.type) || fallback || this.defaultType;
};

Mime.prototype.lookUpExt = function(type, fallback) {
    type = type.replace(TYPE_REPLACER, "").toLowerCase();
    var mimeType = this.extensions.get(type);
    if (!mimeType && fallback === false) return null;

    return (mimeType && mimeType.ext) || fallback || this.defaultType;
};

Mime.prototype.toJSON = function(json) {
    json || (json = {});
    var types = this.types,
        extensions = this.extensions,
        jsonTypes = json.types || (json.types = []),
        jsonExtensions = json.extensions || (json.extensions = []),
        i, il;

    for (i = 0, il = types.length; i < il; i++) jsonTypes[i] = types[i].toJSON(jsonTypes[i]);
    for (i = 0, il = extensions.length; i < il; i++) jsonExtensions[i] = extensions[i].toJSON(jsonExtensions[i]);

    json.defaultType = this.defaultType;
    json.defaultExtension = this.defaultExtension;

    return json;
};

Mime.prototype.fromJSON = function(json) {
    var types = this.types,
        extensions = this.extensions,
        jsonTypes = json.types,
        jsonExtensions = json.extensions,
        type, extension,
        i, il;

    types.setLength(jsonTypes.length);
    for (i = 0, il = jsonTypes.length; i < il; i++) {
        if ((type = types[i])) {
            type.fromJSON(jsonTypes[i]);
        } else {
            types.push(new MimeType().fromJSON(jsonTypes[i]));
        }
    }
    extensions.setLength(jsonExtensions.length);
    for (i = 0, il = jsonExtensions.length; i < il; i++) {
        if ((extension = extensions[i])) {
            extension.fromJSON(jsonExtensions[i]);
        } else {
            extensions.push(new MimeType().fromJSON(jsonExtensions[i]));
        }
    }

    this.defaultType = json.defaultType;
    this.defaultExtension = json.defaultExtension;

    return this;
};


module.exports = new Mime();
