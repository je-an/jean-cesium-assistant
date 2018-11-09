define([
    "Global",
    "TypeCheck",
    "Failure"
], function (
    Global,
    TypeCheck,
    Failure
) {
        /**
         * Provides helper functionality for imagery handling 
         * @alias ImageryAssistant 
         */
        return {
            _viewer: null,
            /** @enum */
            imageryType: {
                WMS: "wms"
            },
            /**
             * @param {Object} options - options object
             * @param {ImageryAssistant.type} options.type - type of the imagery
             * @param {String} options.url - url of the pro
             * @param {String} options.layerName - name of the layers
             */
            _createImagery: function (options) {
                var result;
                switch (options.type) {
                    case this.imageryType.WMS:
                        result = new Cesium.WebMapServiceImageryProvider({
                            url: options.url,
                            layers: options.layerName,
                            tileWidth: 256,
                            tileHeight: 256,
                            minimumLevel: 0,
                            maximumLevel: undefined,
                            parameters: {
                                transparent: 'true',
                                format: 'image/png'
                            }
                        });
                        break;
                }
                return result;
            },
            /** */
            _setDefault: function (url) {
                var provider = new Cesium.createTileMapServiceImageryProvider({
                    url: url + "/Assets/Textures/NaturalEarthII",
                    maximumLevel: 2
                });
                this._imageryLayers.addImageryProvider(provider);
            },
            /** */
            init: function (url) {
                this._viewer = Global.viewer;
                this._imageryLayers = this._viewer.scene.imageryLayers;
                this._setDefault(url);
            },
            /**
             * @param {Object} imagery - options object
             * @param {ImageryAssistant.type} imagery.type - type of the imagery
             * @param {String} imagery.url - url of the pro
             * @param {String} imagery.layerName - name of the layers
             */
            add: function (imagery) {
                var provider = this._createImagery(imagery);
                this._imageryLayers.addImageryProvider(provider);
            },
            /** @param {String} name - imagery name to be removed */
            remove: function (name) {
                var imageryLayers = this._imageryLayers;
                for (var i = 0; i < imageryLayers.length; i++) {
                    if (imageryLayers.get(i).imageryProvider.layers === name) {
                        imageryLayers.remove(imageryLayers.get(i));
                        i--;
                    }
                }
            },
            /** */
            removeAll: function () {
                var imageryLayers = this._imageryLayers;
                for (var i = 0; i < imageryLayers.length; i++) {
                    var imagery = imageryLayers.get(i);
                    if (imagery.imageryProvider.url.indexOf("NaturalEarthII") === -1) {
                        imageryLayers.remove(imagery);
                        i--;
                    }
                }
            },
            /** @param {String} name - name of the imagery */
            show: function (name) {
                var imageryLayers = this._imageryLayers, i, l;
                for (i = 0; i < imageryLayers.length; i++) {
                    l = imageryLayers.get(i);
                    if (l.imageryProvider.layers === name) {
                        l.show = true;
                    }
                }
            },
            /** @param {String} name - name of the imagery */
            hide: function (name) {
                var imageryLayers = this._imageryLayers, i, l;
                for (i = 0; i < imageryLayers.length; i++) {
                    l = imageryLayers.get(i);
                    if (l.imageryProvider.layers === name) {
                        l.show = false;
                    }
                }
            }
        }
    });