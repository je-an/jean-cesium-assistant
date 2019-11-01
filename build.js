({
    baseUrl: '.',
    out: 'dist/jean-cesium-assistant.js',
    optimize: 'uglify2',
    name: 'node_modules/jean-amd/dist/jean-amd',
    include: ["src/CesiumAssistant"],
    wrap: {
        start:
            "(function (root, factory) { \n" +
            " \t if (typeof define === 'function' && define.amd) { \n" +
            "\t \t define([], factory); \n" +
            "\t} else { \n" +
            "\t \troot.CesiumAssistant = root.CesiumAssistant || {}; \n" +
            "\t \troot.CesiumAssistant = factory();\n" +
            "\t}\n" +
            "}(this, function() {",
        end:
            "\n \t return require('src/CesiumAssistant'); \n" +
            "}));"
    },
    paths: {
        Global: "src/Global",
        ImageryAssistant: "src/ImageryAssistant",
        CameraAssistant: "src/CameraAssistant",
        TerrainAssistant: "src/TerrainAssistant",
        GeometryAssistant: "src/GeometryAssistant",
        GeometryUtil: "src/GeometryUtil",
        TypeCheck: "node_modules/jean-type-check/src/TypeCheck",
        Failure: "node_modules/jean-failure/src/Failure"
    }
})