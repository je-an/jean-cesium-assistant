define([
    "Global",
    "ImageryAssistant",
    "CameraAssistant",
    "TerrainAssistant"
], function (
    Global,
    ImageryAssistant,
    CameraAssistant,
    TerrainAssistant
) {
        /**
         * Provides helper functionality for Cesium.js 
         * @alias CesiumAssistant 
         */
        return {
            init: function (url) {
                Global.init();
                ImageryAssistant.init(url);
                CameraAssistant.init(url);
                TerrainAssistant.init(url);
            },
            getViewer: function () {
                return Global.viewer;
            },
            Imagery: ImageryAssistant,
            Camera: CameraAssistant,
            Terrain: TerrainAssistant
        };
    });