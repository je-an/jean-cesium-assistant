(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.CesiumAssistant = root.CesiumAssistant || {}; 
	 	root.CesiumAssistant = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            var mod = factory.apply(factory, resolvedModules);
            modules.resolved[id] = mod ? mod : {};
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('Global',[

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
define('TypeCheck',[], function () {
    return {
        /**
         * Checks if provided element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if provided element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            return !this.isArray(o) && o !== null && typeof o === 'object';
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = false;
            if (this.isObject(o) && Object.keys(o).length === 0) {
                isEmpty = true;
            }
            return isEmpty;
        },
        /**
        * Checks if provided element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if provided element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if provided element is an array
         * @public 
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - true if o is an array, false otherwise
         */
        isArray: function (o) {
            return Array.isArray(o);
        },
        /**
         * Check id provided element is an empty array
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - True if o is an empty array, false otherwise
         */
        isEmptyArray: function (o) {
            return this.isArray(o) && (o.length === 0);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        },
        /**
          * Checks if all objects within array have the same instance
          * @public
          * @memberof TypeCheck
          * @throws {TypeError} - If array is not an array
          * @throws {TypeError} - If constructor is not a function
          * @param {Object[]} array - The array which objects shall be checked
          * @param {Function} fn - the constructor function
          * @returns {Boolean} - True if all elements have the same instance, false otherwise
          */
        areObjectsInstanceOf: function (array, fn) {
            if (!this.isArray(array)) {
                throw new TypeError("array is not an array");
            }
            if (!this.isFunction(fn)) {
                throw new TypeError("fn is not a function");
            }
            var i, o, length = array.length, result = true;
            for (i = 0; i < length; i++) {
                o = array[i];
                if (!this.isObject(o) || !this.isInstanceOf(o, fn)) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if the objects have are instances of the provided constructors
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If array is not an array
         * @throws {TypeError} - If constructors is not an array
         * @param {Object[]} objects - The array which objects shall be checked
         * @param {Function[]} constructors - An array of constructor functions
         * @returns {Boolean} - True if all elements have the same instance, false otherwise
         */
        areObjectsInstancesOf: function (objects, constructors) {
            var i, j, o, length = objects.length, constructorLength = constructors.length, result = true, noConstructorMatched;
            if (!this.isArray(objects)) {
                throw new TypeError("objects is not an array");
            }
            if (!this.isArray(constructors)) {
                throw new TypeError("constructors is not an array");
            }
            if (!this.isArrayTypeOf(constructors, "function")) {
                throw new TypeError("constructors is not an array of constructor functions");
            }
            for (i = 0; i < length; i++) {
                o = objects[i];
                noConstructorMatched = true;
                for (j = 0; j < constructorLength; j++) {
                    if (!this.isObject(o)) {
                        break;
                    }
                    if (this.isInstanceOf(o, constructors[j])) {
                        noConstructorMatched = false;
                        break;
                    }
                }
                if (noConstructorMatched === true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if child is an instance of parent
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If child is not an object
         * @throws {TypeError} - If parent is not a function
         * @param {Object} child - The object which shall be checked
         * @param {Function} parent - The function which shall be the constructor
         * @returns {Boolean} - True if child is an instance of parent, false otherwise
         */
        isInstanceOf: function (child, parent) {
            if (!this.isObject(child)) {
                throw new TypeError("child is not an object");
            }
            if (!this.isFunction(parent)) {
                throw new TypeError("parent is not a function");
            }
            return child instanceof parent;
        },
        /**
         * Checks if the provided value is a value of the provided object which is used as an enum
         * @throws {TypeError} - If value is not a string or a number
         * @throws {TypeError} - If o is not an object
         * @param {String|Number} value - the value
         * @param {Object} o - the object which shall be checked
         * @returns {Boolean} - True if value is part of o, false otherwise
         */
        isEnumValue: function (value, o) {
            if (!this.isDefined(value)) {
                return false;
            }
            if (!this.isString(value) && !this.isNumber(value)) {
                throw new TypeError("value must be a String or a Number");
            }
            if (!this.isObject(o)) {
                throw new TypeError("o is not an object");
            }
            var keys = Object.keys(o), length = keys.length, i, isValue = false;
            for (i = 0; i < length; i++) {
                if (o[keys[i]] === value) {
                    isValue = true;
                    break;
                }
            }
            return isValue;
        }
    };
});
define('Failure',[], function () {
    /**
     * Provides error throwing functionality 
     * @alias Failure 
     */
    return {
        /**
         * Throws an Error with the provided errorMessage
         * @throws {Error}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this Error
         */
        throwError: function (errorMessage) {
            throw new Error(errorMessage);
        },
        /**
         * Throws an TypeError with the provided errorMessage
         * @throws {TypeError}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this TypeError
         */
        throwTypeError: function (errorMessage) {
            throw new TypeError(errorMessage);
        }
    };
});
define('ImageryAssistant',[
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
define('CameraAssistant',[
    "Global",
    "TypeCheck",
    "Failure"
], function (Global, TypeCheck, Failure) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias CameraAssistant 
     */
    return {
        init: function (url) {

        },
        /**
         * @param {Number} flyTime - the time for camera movement in seconds
         * @param {Object} bounding - bounding object
         * @param {Number} bounding.northLatitude - the north bound
         * @param {Number} bounding.eastLongitude - the east bound
         * @param {Number} bounding.southLatitude - the south bound
         * @param {Number} bounding.westLongitude - the west bound
         */
        flyToBounding: function (flyTime, bounding) {
            if (!TypeCheck.isNumber(flyTime)) {
                Failure.throwTypeError("flyTime is not a number");
            }
            var westLongitude = -180,
                southLatitude = -90,
                eastLongitude = 180,
                northLatitude = 90;

            westLongitude = bounding.westLongitude > westLongitude ? bounding.westLongitude : westLongitude;
            eastLongitude = bounding.eastLongitude < eastLongitude ? bounding.eastLongitude : eastLongitude;
            southLatitude = bounding.southLatitude > southLatitude ? bounding.southLatitude : southLatitude;
            northLatitude = bounding.northLatitude < northLatitude ? bounding.northLatitude : northLatitude;

            Global.viewer.camera.flyTo({
                destination: Cesium.Rectangle.fromDegrees(westLongitude, southLatitude, eastLongitude, northLatitude),
                duration: TypeCheck.isNumber(flyTime) ? flyTime : 0
            });
        }
    };
});
define('TerrainAssistant',[
    "Global",
    "TypeCheck",
    "Failure"
], function (Global, TypeCheck, Failure) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias CameraAssistant 
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
define('src/CesiumAssistant',[
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
                Global.init(url);
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

 	 return require('src/CesiumAssistant'); 
}));
