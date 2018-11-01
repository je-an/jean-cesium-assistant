define([
    "Global",
    "ImageryAssistant"
], function (Global, ImageryAssistant) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias CesiumAssistant 
     */
    return {
        /** @enum */
        assistantType: {
            IMAGERY: 0
        },
        init: function (url) {
            Global.startViewer();
            ImageryAssistant.init(url);
        },
        getViewer: function () {
            return Global.viewer;
        },
        Imagery: ImageryAssistant
    };
});