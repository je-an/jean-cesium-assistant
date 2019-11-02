define([
    "Global",
    "TypeCheck",
    "Failure"
], function (Global, TypeCheck, Failure) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias TerrainAssistant 
     */
    return {
        _terrainProvider: null,
        /** @enum */
        terrainType: {
            GEOSERVER: "geoserver"
        },
        init: function (url) {

        },
        /** */
        add: function (options) {
            var viewer = Global.viewer,
                provider = this.terrainProvider = new Cesium.GeoserverTerrainProvider({
                    url: options.url,
                    layerName: options.layer ? options.layer : ""
                });
            viewer.scene.globe.terrainProvider = provider;
            viewer.scene.terrainProvider = provider;
            viewer.scene.globe.enableLighting = options.enableLighting ? options.enableLighting : false;
        },
        /** */
        remove: function () {
            var viewer = Global.viewer;
            viewer.scene.globe.terrainProvider = new Cesium.EllipsoidTerrainProvider();
            viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider();
        }
    };
});