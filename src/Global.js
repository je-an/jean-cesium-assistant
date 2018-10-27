define([

], function () {
    'use strict';
    return {
        viewer: null,
        startViewer: function () {
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