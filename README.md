## Description

Provides helper functionality for Cesium.js

## Support
Supports both CommonJS and AMD eco system. If there is no loader, CesiumAssistant is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var obj = new CesiumAssistant();
```
- Use it with require.js
```js
require(["path/to/CesiumAssistant"], function(CesiumAssistant){
    // Work with CesiumAssistant
});
```
- Use it with node.js
```js
var CesiumAssistant = require("jean-cesium-assistant");
```
## Installation

`npm install jean-cesium-assistant --save --legacy-bundling`

## API Reference

TBD

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT