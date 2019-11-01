define([
    "Global",
    "GeometryUtil"
], function (Global, GeometryUtil) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias GeometryAssistant 
     */
    return {
        init: function (url) {

        },
        /**
        * @param {Cesium.Primitive} p - The primitive which shall be added
        */
        addGeometry: function (p) {
            Global.viewer.scene.primitives.add(p);
        },
        /**
         * @param {Cesium.Primitive} p - The primitive which shall be removed
         */
        removeGeometry: function (p) {
            Global.viewer.scene.primitives.remove(p);
        },
        /**
        * @param {String} id - String of primitive, which shall be removed
        */
        removeGeometryById: function (id) {
            var isRemoved = false;
            if (!Check.isString(id)) {
                Exception.throwTypeError("id is not string");
            }
            var primitives = Setup._viewer.scene.primitives;
            var length = primitives.length;
            for (var i = 0; i < length; ++i) {
                var p = primitives.get(i);
                if (p.id === id) {
                    this.removeGeometry(p);
                    isRemoved = true;
                    break;
                }
            }
            return isRemoved;
        },
        /**
         * Draws a polyline on the globe
         * @public
         * @memberof GeometryAssistant
         * @param {Waypoint[]} waypoints - list of waypoints
         * @param {String} id - id of the polyline 
         * @returns {Cesium.PolylineCollection} - the drawn polylineCollection
         */
        drawPolylineGeometry: function (waypoints, id) {
            var cartesians = [], i, wp, path;
            for (i = 0; i < waypoints.length; i++) {
                wp = waypoints[i];
                cartesians.push(Cesium.Cartesian3.fromDegrees(wp.longitude, wp.latitude, wp.altitude));
            }
            path = new Cesium.PolylineCollection();
            path.add(GeometryUtil.getPolylineOptions({ cartesians: cartesians }));
            this.addGeometry(path);
            return path;
        },
        /**
         * @param {Object} options - options object
         * @param {String} options.id - id of this geometry
         * @param {BoundingBox} options.boundingBox - the boundingbox, from which the square shall be drawn
         * @param {Number} [options.height=0] - Height of the square 
         * @param {Cesium.Color} [options.color=Random] - Color of the square
         * @returns {Cesium.Primitive} - the drawn primitive instance
         */
        drawSquareGeometry: function (options) {
            var color = options.color ? options.color : Cesium.Color.fromRandom({ alpha: 0.7 });
            var instance = new Cesium.GeometryInstance({
                geometry: new Cesium.RectangleGeometry({
                    rectangle: Cesium.Rectangle.fromDegrees(options.boundingBox.westLongitude,
                        options.boundingBox.southLatitude,
                        options.boundingBox.eastLongitude,
                        options.boundingBox.northLatitude),
                    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
                    height: options.height ? options.height : 0
                }),
                attributes: {
                    color: new Cesium.ColorGeometryInstanceAttribute.fromColor(color)
                }
            });
            var primitive = new Cesium.GroundPrimitive({
                geometryInstances: instance,
                appearance: new Cesium.PerInstanceColorAppearance()
            });
            primitive.id = options.id ? options.id : "no-id-provided";
            this.addGeometry(primitive);
            return primitive;
        }
    };
});