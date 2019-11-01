!function(e,r){"function"==typeof define&&define.amd?define([],r):(e.CesiumAssistant=e.CesiumAssistant||{},e.CesiumAssistant=r())}(this,function(){var e,r;return function(i){function t(e){for(var r=0,i=[];r<e.length;r++){var t=a.resolved[e[r]];t&&i.push(t)}return i}function n(){for(var e in a.unresolved){var r=a.unresolved[e],i=t(r.dependencies);o(e,r.factory,r.dependencies,i,!1)}}function o(e,r,i,t,n){if(t.length===i.length){var o=r.apply(r,t);a.resolved[e]=o||{}}else n&&(a.unresolved[e]={dependencies:i,factory:r})}var a={resolved:{},unresolved:{}};r=function(e,r,i){return a.resolved[e]?void console.warn("There is already a module with id <"+e+"> defined. Therefore this module will be ignored"):"string"==typeof e&&Array.isArray(r)&&"function"==typeof i?(0===r.length?o(e,i,r,[],!1):o(e,i,r,t(r),!0),void n()):void console.warn("Passed arguments for module are invalid")},r.amd={},e=function(e,r){e=Array.isArray(e)?e:[e];var i=t(e);if(1===i.length&&!r)return i[0];if(i.length!==e.length||!r)throw new Error("Not all modules are resolved");r.apply(r,i)}}(),r("node_modules/jean-amd/dist/jean-amd",function(){}),r("Global",[],function(){return{viewer:null,init:function(e){window.CESIUM_BASE_URL=e,this.viewer=new Cesium.Viewer("cesium-container",{imageryProvider:!1,animation:!1,baseLayerPicker:!1,fullscreenButton:!1,homeButton:!1,vrButton:!1,geocoder:!1,infoBox:!1,sceneModePicker:!1,selectionIndicator:!1,timeline:!1,navigationHelpButton:!1,navigationInstructionsInitiallyVisible:!1})}}}),r("TypeCheck",[],function(){return{isString:function(e){return"string"==typeof e},isBoolean:function(e){return"boolean"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:function(e){return!this.isArray(e)&&null!==e&&"object"==typeof e},isEmptyObject:function(e){var r=!1;return this.isObject(e)&&0===Object.keys(e).length&&(r=!0),r},isFunction:function(e){return"function"==typeof e},isDefined:function(e){return void 0!==e&&null!=e},isArray:function(e){return Array.isArray(e)},isEmptyArray:function(e){return this.isArray(e)&&0===e.length},isArrayTypeOf:function(e,r){var i=!0;if(!this.isString(r))throw new TypeError("options.type is not a string");if(!Array.isArray(e))throw new TypeError("options.array is not an array");0===e.length&&(i=!1);for(var t=0,n=e.length;t<n;t++){if(typeof e[t]!==r){i=!1;break}}return i},areObjectsInstanceOf:function(e,r){if(!this.isArray(e))throw new TypeError("array is not an array");if(!this.isFunction(r))throw new TypeError("fn is not a function");var i,t,n=e.length,o=!0;for(i=0;i<n;i++)if(t=e[i],!this.isObject(t)||!this.isInstanceOf(t,r)){o=!1;break}return o},areObjectsInstancesOf:function(e,r){var i,t,n,o,a=e.length,s=r.length,u=!0;if(!this.isArray(e))throw new TypeError("objects is not an array");if(!this.isArray(r))throw new TypeError("constructors is not an array");if(!this.isArrayTypeOf(r,"function"))throw new TypeError("constructors is not an array of constructor functions");for(i=0;i<a;i++){for(n=e[i],o=!0,t=0;t<s&&this.isObject(n);t++)if(this.isInstanceOf(n,r[t])){o=!1;break}if(!0===o){u=!1;break}}return u},isInstanceOf:function(e,r){if(!this.isObject(e))throw new TypeError("child is not an object");if(!this.isFunction(r))throw new TypeError("parent is not a function");return e instanceof r},isEnumValue:function(e,r){if(!this.isDefined(e))return!1;if(!this.isString(e)&&!this.isNumber(e))throw new TypeError("value must be a String or a Number");if(!this.isObject(r))throw new TypeError("o is not an object");var i,t=Object.keys(r),n=t.length,o=!1;for(i=0;i<n;i++)if(r[t[i]]===e){o=!0;break}return o}}}),r("Failure",[],function(){return{throwError:function(e){throw new Error(e)},throwTypeError:function(e){throw new TypeError(e)}}}),r("ImageryAssistant",["Global","TypeCheck","Failure"],function(e,r,i){return{_viewer:null,imageryType:{WMS:"wms"},_createImagery:function(e){var r;switch(e.type){case this.imageryType.WMS:r=new Cesium.WebMapServiceImageryProvider({url:e.url,layers:e.layerName,tileWidth:256,tileHeight:256,minimumLevel:0,maximumLevel:void 0,parameters:{transparent:"true",format:"image/png"}})}return r},_setDefault:function(e){var r=new Cesium.createTileMapServiceImageryProvider({url:e+"/Assets/Textures/NaturalEarthII",maximumLevel:2});this._imageryLayers.addImageryProvider(r)},init:function(r){this._viewer=e.viewer,this._imageryLayers=this._viewer.scene.imageryLayers,this._setDefault(r)},add:function(e){var r=this._createImagery(e);this._imageryLayers.addImageryProvider(r)},remove:function(e){for(var r=this._imageryLayers,i=0;i<r.length;i++)r.get(i).imageryProvider.layers===e&&(r.remove(r.get(i)),i--)},removeAll:function(){for(var e=this._imageryLayers,r=0;r<e.length;r++){var i=e.get(r);-1===i.imageryProvider.url.indexOf("NaturalEarthII")&&(e.remove(i),r--)}},show:function(e){var r,i,t=this._imageryLayers;for(r=0;r<t.length;r++)i=t.get(r),i.imageryProvider.layers===e&&(i.show=!0)},hide:function(e){var r,i,t=this._imageryLayers;for(r=0;r<t.length;r++)i=t.get(r),i.imageryProvider.layers===e&&(i.show=!1)}}}),r("CameraAssistant",["Global","TypeCheck","Failure"],function(e,r,i){return{init:function(e){},flyToBounding:function(t,n){r.isNumber(t)||i.throwTypeError("flyTime is not a number");var o=-180,a=-90,s=180,u=90;o=n.westLongitude>o?n.westLongitude:o,s=n.eastLongitude<s?n.eastLongitude:s,a=n.southLatitude>a?n.southLatitude:a,u=n.northLatitude<u?n.northLatitude:u,e.viewer.camera.flyTo({destination:Cesium.Rectangle.fromDegrees(o,a,s,u),duration:r.isNumber(t)?t:0})}}}),r("TerrainAssistant",["Global","TypeCheck","Failure"],function(e,r,i){return{_terrainProvider:null,terrainType:{GEOSERVER:"geoserver"},init:function(e){},add:function(r){var i=e.viewer,t=this.terrainProvider=new Cesium.GeoserverTerrainProvider({url:r.url,layerName:r.layer?r.layer:""});i.scene.globe.terrainProvider=t,i.scene.terrainProvider=t,i.scene.globe.enableLighting=!!r.enableLighting&&r.enableLighting},remove:function(){var r=e.viewer;r.scene.globe.terrainProvider=new Cesium.EllipsoidTerrainProvider,r.scene.terrainProvider=new Cesium.EllipsoidTerrainProvider}}}),r("GeometryUtil",["Global","TypeCheck","Failure"],function(e,r,i){return{getPolylineOptions:function(e){return{id:r.isString(e.id)?e.id:"00000000-0000-0000-0000-000000000000",positions:e.cartesians.length?e.cartesians:[],material:Cesium.Material.fromType("Color",{color:e.color?e.color:Cesium.Color.fromRandom({alpha:1})}),width:e.width?e.width:2,show:!e.show||e.show}}}}),r("GeometryAssistant",["Global","GeometryUtil"],function(e,r){return{init:function(e){},addGeometry:function(r){e.viewer.scene.primitives.add(r)},removeGeometry:function(r){e.viewer.scene.primitives.remove(r)},removeGeometryById:function(e){var r=!1;Check.isString(e)||Exception.throwTypeError("id is not string");for(var i=Setup._viewer.scene.primitives,t=i.length,n=0;n<t;++n){var o=i.get(n);if(o.id===e){this.removeGeometry(o),r=!0;break}}return r},drawPolylineGeometry:function(e,i){var t,n,o,a=[];for(t=0;t<e.length;t++)n=e[t],a.push(Cesium.Cartesian3.fromDegrees(n.longitude,n.latitude,n.altitude));return o=new Cesium.PolylineCollection,o.add(r.getPolylineOptions({cartesians:a})),this.addGeometry(o),o},drawSquareGeometry:function(e){var r=e.color?e.color:Cesium.Color.fromRandom({alpha:.7}),i=new Cesium.GeometryInstance({geometry:new Cesium.RectangleGeometry({rectangle:Cesium.Rectangle.fromDegrees(e.boundingBox.westLongitude,e.boundingBox.southLatitude,e.boundingBox.eastLongitude,e.boundingBox.northLatitude),vertexFormat:Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,height:e.height?e.height:0}),attributes:{color:new Cesium.ColorGeometryInstanceAttribute.fromColor(r)}}),t=new Cesium.GroundPrimitive({geometryInstances:i,appearance:new Cesium.PerInstanceColorAppearance});return t.id=e.id?e.id:"no-id-provided",this.addGeometry(t),t}}}),r("src/CesiumAssistant",["Global","ImageryAssistant","CameraAssistant","TerrainAssistant","GeometryAssistant"],function(e,r,i,t,n){return{init:function(o){e.init(o),r.init(o),i.init(o),t.init(o),n.init(o)},getViewer:function(){return e.viewer},Imagery:r,Camera:i,Terrain:t,Geometry:n}}),e("src/CesiumAssistant")});