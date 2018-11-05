define([
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
         * @param {Number} flyTime - the time which are
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
            northLatitude = bounding.northLatitude > northLatitude ? bounding.northLatitude : northLatitude;

            Global.viewer.camera.flyTo({
                destination: Cesium.Rectangle.fromDegrees(westLongitude, southLatitude, eastLongitude, northLatitude),
                duration: TypeCheck.isNumber(flyTime) ? flyTime : 0
            });
        }
    };
});