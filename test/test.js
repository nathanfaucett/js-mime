var assert = require("assert"),
    mime = require("../src/index");


describe("mime", function() {
    describe("#lookUp(path : String[, fallback : String])", function() {
        it("should return mime type of path ext", function() {
            assert.equal(mime.lookUp("test", "application/json"), "application/json");
            assert.equal(mime.lookUp("test.json"), "application/json");
        });
    });
    describe("#lookUpType(ext : String[, fallback : String])", function() {
        it("should return mime type of ext", function() {
            assert.equal(mime.lookUpType("json"), "application/json");
        });
    });
    describe("#lookUpExt(type : String[, fallback : String])", function() {
        it("should return ext of mime type", function() {
            assert.equal(mime.lookUpExt("application/json"), "json");
        });
    });
});
