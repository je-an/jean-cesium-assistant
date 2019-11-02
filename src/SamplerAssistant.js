define([
    "Global",
    "TypeCheck",
    "Failure",
    "GeoCoordinateValidator"
], function (Global, TypeCheck, Failure, GeoCoordinateValidator) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias SamplerAssistant 
     */
    return {
        init: function (url) {

        },
        /**
         * @param {Object} options - options object
         * @param {Waypoint[]} options.waypoints - the waypoints which shall be sampled
         * @param {TimeLine} options.timeline - the timeline
         * @returns {Cesium.SampledPositionProperty} - The initialised sampled position property
         */
        createSampledPositionProperty: function (options) {
            var waypoints = options.waypoints,
                timeline = options.timeline.values,
                prop = new Cesium.SampledPositionProperty(),
                i, wp, stamp;

            if (!TypeCheck.isArray(waypoints) || !TypeCheck.isArray(timeline)) {
                Failure.throwTypeError("waypoints or timeline.values is not an array");
            }
            if (waypoints.length !== timeline.length) {
                Failure.throwTypeError("waypoints and timeline must be equal in length");
            }
            for (i = 0; i < waypoints.length; i++) {
                wp = waypoints[i], stamp = timeline[i];
                // Check, if stamp is not a date, if so make it a date
                if (!TypeCheck.isInstanceOf(stamp, Date)) {
                    stamp = new Date(stamp);
                }
                if (GeoCoordinateValidator.isCoordinateValid(position)) {
                    var location = Cesium.Cartesian3.fromDegrees(
                        position.longitude,
                        position.latitude,
                        position.altitude
                    );
                    property.addSample(Cesium.JulianDate.fromDate(stamp), location);
                }
            }
            return prop;
        },
        /**
        * @param {Object} sPropOpts - data to be sampled
        * @param {String} sPropOpts.type - value type to be sampled -> Number
        * @param {String} sPropOpts.propertyName - name of the property from the object within dataToBeSampled which shall be used for sampling
        * @param {Object[]} sPropOpts.dataToBeSampled - object array with data for sampling
        * @param {Number[]} sPropOpts.timeline - Each value within this array maps as time reference to an object within the positions array
        * @returns {Cesium.SampledPositionProperty} - The initialised sampled property
        */
        createSampledProperty: function (sPropOpts) {
            var property = new Cesium.SampledProperty(sPropOpts.type),
                data = sPropOpts.dataToBeSampled,
                timeline = sPropOpts.timeline,
                propName = sPropOpts.propertyName;
            if (!TypeCheck.isDefined(sPropOpts)) {
                Failure.throwTypeError("sPropOpts is undefined");
            }
            if (!TypeCheck.isDefined(sPropOpts.type) &&
                !TypeCheck.isDefined(sPropOpts.propertyName)) {
                Failure.throwTypeError("type or propertyName is undefined");
            }
            if (!TypeCheck.isDefined(sPropOpts.dataToBeSampled) ||
                !TypeCheck.isArray(sPropOpts.dataToBeSampled)) {
                Failure.throwTypeError("dataToBeSampled is undefined");
            }
            for (var i = 0, length = data.length; i < length; i++) {
                var timeStamp = timeline[i];
                if (!TypeCheck.isInstanceOf(stamp, Date)) {
                    timeStamp = new Date(timeStamp);
                }
                if (TypeCheck.isInstanceOf(stamp, Date)) {
                    var time = Cesium.JulianDate.fromDate(timeStamp);
                    property.addSample(time, data[i][propName]);
                }
            }
            return property;
        },
        /**
         * @param {Object} cPropOpts - data to be sampled
         * @param {String} cPropOpts.type - value type to be sampled -> Number
         * @param {String} cPropOpts.propertyName - name of the property from the object within dataToBeSampled which shall be used for sampling
         * @param {Object[]} cPropOpts.dataToBeSampled - object array with data for sampling
         * @param {Number[]} cPropOpts.timeline - Each value within this array maps as time reference to an object within the positions array
         * @returns {Cesium.SampledPositionProperty} - The initialised sampled property
         */
        getConstantValueProperty: function (cPropOpts) {
            var property = new Cesium.SampledProperty(cPropOpts.type),
                values = cPropOpts.dataToBeSampled,
                timeline = cPropOpts.timeline,
                first, second;

            if (!TypeCheck.isDefined(cPropOpts)) {
                Failure.throwTypeError("cPropOpts is undefined");
            }
            if (!TypeCheck.isDefined(cPropOpts.type) &&
                !TypeCheck.isDefined(cPropOpts.propertyName)) {
                Failure.throwTypeError("type or propertyName is undefined");
            }
            if (!TypeCheck.isDefined(cPropOpts.dataToBeSampled) ||
                !TypeCheck.isArray(cPropOpts.dataToBeSampled)) {
                Failure.throwTypeError("dataToBeSampled is invalid");
            }

            for (var i = 0, length = values.length; i < length; i++) {
                var stamp = timeline[i];
                if (!TypeCheck.isInstanceOf(stamp, Date)) {
                    stamp = new Date(stamp);
                }
                else {
                    if (i === 0) {
                        first = Cesium.JulianDate.fromDate(stamp);
                    } else {
                        first = Cesium.JulianDate.fromDate(stamp);
                        Cesium.JulianDate.addSeconds(first, 1, first);
                    }

                    var data = values[i][cPropOpts.propertyName];
                    property.addSample(first, data);

                    if (i < values.length - 1) {
                        var valSecond = timeline[i + 1];
                        if (!TypeCheck.isInstanceOf(stamp, Date)) {
                            valSecond = new Date(valSecond);
                        }
                        second = Cesium.JulianDate.fromDate(valSecond);
                        property.addSample(second, data);
                    }
                }
            }
            return property;
        }
    };
});