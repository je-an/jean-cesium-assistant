define(["Global"], function (Global) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias CesiumAssistant 
     */
    return {
        init: function () {
            Global.startViewer();
        },
        getViewer: function(){
            return Global.viewer;
        }
    }
});