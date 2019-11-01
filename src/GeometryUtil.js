define([
    "Global",
    "TypeCheck",
    "Failure"
], function (Global, TypeCheck, Failure) {
    /**
     * @alias GeometryUtil 
     */
    return {
        /**
         * Creates an object with all values necessary for creating a polyline
         * @param {Object} options - options object
         * @param {String} [options.id=Guid.Empty] - Id of the polyline
         * @param {Cesium.Cartesian3[]} [options.cartesians=[]] - Positions of the polyline
         * @param {Cesium.Color} [options.color=Random] - color of the polyline
         * @param {Number} [options.width=2] - width of the polyline
         * @param {Boolean} [options.show=true] - True if the polyline shall be shown, false if hidden
         * @returns {Object} - constructor options for creation a polyline 
         */
        getPolylineOptions: function (options) {
            return {
                id: TypeCheck.isString(options.id) ? options.id : "00000000-0000-0000-0000-000000000000",
                positions: options.cartesians.length ? options.cartesians : [],
                material: Cesium.Material.fromType('Color', {
                    color: options.color ? options.color : Cesium.Color.fromRandom({ alpha: 1 })
                }),
                width: options.width ? options.width : 2,
                show: options.show ? options.show : true
            };
        }
    };
});