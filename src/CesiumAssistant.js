define([
    "Global",
    "ImageryAssistant",
    "CameraAssistant",
    "TerrainAssistant",
    "GeometryAssistant"
], function (
    Global,
    ImageryAssistant,
    CameraAssistant,
    TerrainAssistant,
    GeometryAssistant
) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias CesiumAssistant 
     */
    return {
        init: function (url) {
            Global.init(url);
            ImageryAssistant.init(url);
            CameraAssistant.init(url);
            TerrainAssistant.init(url);
            GeometryAssistant.init(url);  
        },
        getViewer: function () {
            return Global.viewer;
        },
        Imagery: ImageryAssistant,
        Camera: CameraAssistant,
        Terrain: TerrainAssistant,
        Geometry: GeometryAssistant
    };
});