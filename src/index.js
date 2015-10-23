var FastHash = require("fast_hash"),
    isArray = require("is_array"),
    isString = require("is_string"),
    fileType = require("file_type"),
    MimeType = require("./MimeType"),
    SPLITER = require("./SPLITER");


var REPLACER = /.*[\.\/\\]/,
    TYPE_REPLACER = /;[(.*)\S\s]+/,
    MimePrototype;


function Mime() {

    this.types = new FastHash("ext");
    this.extensions = new FastHash("type");

    this.defaultType = "text/plain";
    this.defaultExtension = "txt";

    this.defaults();
}
MimePrototype = Mime.prototype;

MimePrototype.defaults = function() {
    if (this.types.count() > 0 || this.extensions.count() > 0) {
        this.clear();
    }

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
    this.register("video/ogg", "ogv");
    this.register("video/mp4", "mp4");

    this.register("audio/wav", "wav");
    this.register("audio/ogg", "oga ogg");
    this.register("audio/mp3", "mp3");

    this.register("application/xml", "xml");

    this.register("application/json", "json");
    this.register("application/pdf", "pdf");
    this.register("application/zip", "zip");

    return this;
};

MimePrototype.clear = function() {

    this.defaultType = "text/plain";
    this.defaultExtension = "txt";

    this.types.clear();
    this.extensions.clear();

    return this;
};

MimePrototype.register = function(types, exts) {
    var mimeType = new MimeType(types, exts);

    this.types.add(mimeType);
    this.extensions.add(mimeType);

    return this;
};

MimePrototype.unregister = function(exts) {
    var extensions, i;

    exts = isArray(exts) ? exts : (isString(exts) ? exts.split(SPLITER) : []);
    extensions = this.extensions;
    i = exts.length;

    while (i--) {
        if ((mimeType = extensions.get(exts[i]))) {
            break;
        }
    }

    if (mimeType) {
        extensions.remove(mimeType);
        this.types.remove(mimeType);
    }

    return this;
};

MimePrototype.unregisterType = function(types) {
    var thisTypes, i;

    types = isArray(types) ? types : (isString(types) ? types.split(SPLITER) : []);
    thisTypes = this.thisTypes;
    i = types.length;

    while (i--) {
        if ((mimeType = thisTypes.get(types[i]))) {
            break;
        }
    }

    if (mimeType) {
        thisTypes.remove(mimeType);
        this.extensions.remove(mimeType);
    }

    return this;
};

MimePrototype.fileType = function(value) {
    var buf = Buffer.isBuffer(value) ? value : new Buffer(value),
        key;

    for (key in fileType) {
        if (fileType[key](buf)) {
            return key;
        }
    }
    return undefined;
};

MimePrototype.lookUp = function(path, fallback) {
    var ext = path.replace(REPLACER, "").toLowerCase(),
        types = this.types,
        typesArray = types.__array,
        mimeType = types.get(ext),
        testMimeType, exts, i, j, jl;

    if (!mimeType) {
        i = typesArray.length;
        while (i--) {
            testMimeType = typesArray[i];
            exts = testMimeType.exts;

            for (j = 0, jl = exts.length; j < jl; j++) {
                if (ext === exts[j]) {
                    mimeType = testMimeType;
                    break;
                }
            }
            if (mimeType) {
                break;
            }
        }
    }
    if (!mimeType && fallback === false) {
        return null;
    }

    return (mimeType && mimeType.type) || fallback || this.defaultType;
};

MimePrototype.lookUpType = function(ext, fallback) {
    var mimeType;

    ext = ext.replace(REPLACER, "").toLowerCase();
    mimeType = this.types.get(ext);

    if (!mimeType && fallback === false) {
        return null;
    }

    return (mimeType && mimeType.type) || fallback || this.defaultType;
};

MimePrototype.lookUpExt = function(type, fallback) {
    var mimeType;

    type = type.replace(TYPE_REPLACER, "").toLowerCase();
    mimeType = this.extensions.get(type);

    if (!mimeType && fallback === false) {
        return null;
    }

    return (mimeType && mimeType.ext) || fallback || this.defaultType;
};

MimePrototype.toJSON = function(json) {
    var types, extensions, jsonTypes, jsonExtensions, i, il;

    json || (json = {});

    types = this.types.__array;
    extensions = this.extensions.__array;
    jsonTypes = json.types || (json.types = []);
    jsonExtensions = json.extensions || (json.extensions = []);

    for (i = 0, il = types.length; i < il; i++) {
        jsonTypes[i] = types[i].toJSON(jsonTypes[i]);
    }
    for (i = 0, il = extensions.length; i < il; i++) {
        jsonExtensions[i] = extensions[i].toJSON(jsonExtensions[i]);
    }

    json.defaultType = this.defaultType;
    json.defaultExtension = this.defaultExtension;

    return json;
};

MimePrototype.fromJSON = function(json) {
    var types = this.types,
        extensions = this.extensions,
        jsonTypes = json.types,
        jsonExtensions = json.extensions,
        type, extension,
        i, il;

    types.clear();
    extensions.clear();

    for (i = 0, il = jsonTypes.length; i < il; i++) {
        if ((type = types[i])) {
            type.fromJSON(jsonTypes[i]);
        } else {
            types.add(new MimeType().fromJSON(jsonTypes[i]));
        }
    }
    for (i = 0, il = jsonExtensions.length; i < il; i++) {
        if ((extension = extensions[i])) {
            extension.fromJSON(jsonExtensions[i]);
        } else {
            extensions.add(new MimeType().fromJSON(jsonExtensions[i]));
        }
    }

    this.defaultType = json.defaultType;
    this.defaultExtension = json.defaultExtension;

    return this;
};


module.exports = new Mime();
