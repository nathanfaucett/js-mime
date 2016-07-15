Mime
=======

mime for the browser and node.js

```javascript
var mime = require("@nathanfaucett/mime");


// use fallback argument
mime.lookUp("test", "application/json") === "application/json";
mime.lookUp("test.json") === "application/json";
mime.lookUpType("json") === "application/json";
mime.lookUpExt("application/json") === "json";
```
