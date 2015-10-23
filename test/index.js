var tape = require("tape"),
    mime = require("..");


tape("mime#lookUp(path : String[, fallback : String]) should return mime type of path ext", function(assert) {
    assert.equal(mime.lookUp("test", "application/json"), "application/json");
    assert.equal(mime.lookUp("test.json"), "application/json");
    assert.end();
});

tape("mime#lookUpType(ext : String[, fallback : String]) should return mime type of ext", function(assert) {
    assert.equal(mime.lookUpType("json"), "application/json");
    assert.end();
});

tape("mime#lookUpExt(type : String[, fallback : String]) should return ext of mime type", function(assert) {
    assert.equal(mime.lookUpExt("application/json"), "json");
    assert.end();
});
