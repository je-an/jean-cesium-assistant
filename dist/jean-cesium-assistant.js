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
define('src/CesiumAssistant',["Global"], function (Global) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias CesiumAssistant 
     */
    return {
        init: function () {
            Global.startViewer();
        }
    }
});

 	 return require('src/CesiumAssistant'); 
}));
