define([
    "Global",
    "ImageryAssistant",
    "CameraAssistant"
], function (
    Global,
    ImageryAssistant,
    CameraAssistant
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
            },
            getViewer: function () {
                return Global.viewer;
            },
            Imagery: ImageryAssistant
        };
    });