define([
    "Global",
    "ImageryAssistant",
    "CameraAssistant",
    "TerrainAssistant",
    "GeometryAssistant",
    "ClockAssistant"
], function (
    Global,
    ImageryAssistant,
    CameraAssistant,
    TerrainAssistant,
    GeometryAssistant,
    ClockAssistant
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
            ClockAssistant.init(url);
        },
        getViewer: function () {
            return Global.viewer;
        },
        Imagery: ImageryAssistant,
        Camera: CameraAssistant,
        Terrain: TerrainAssistant,
        Geometry: GeometryAssistant,
        Clock: ClockAssistant
    };
});