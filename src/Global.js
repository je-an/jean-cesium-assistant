define([

], function (
    
) {
    return {
        viewer: null,
        init: function (url) {
            window.CESIUM_BASE_URL = url;
            this.viewer = new Cesium.Viewer('cesium-container', {
                imageryProvider: false,
                animation: false,
                baseLayerPicker: false,
                fullscreenButton: false,
                homeButton: false,
                vrButton: false,
                geocoder: false,
                infoBox: false,
                sceneModePicker: false,
                selectionIndicator: false,
                timeline: false,
                navigationHelpButton: false,
                navigationInstructionsInitiallyVisible: false
            });
        }
    };
});