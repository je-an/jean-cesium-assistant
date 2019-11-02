define([
    "Global",
    "TypeCheck",
    "Failure",
    "Merge"
], function (Global, TypeCheck, Failure, Merge) {
    /**
     * Provides helper functionality for Cesium.js 
     * @alias GeometryAssistant 
     */
    return {
        init: function (url) {
     
        },
        /** */
        getCurrentTime: function () {
            return Global.viewer.clock.currentTime;
        },
        /**
         * @param {Cesium.JulianDate} time - The new time for the cesium clock
         */
        setCurrentTime: function (time) {
            if (!TypeCheck.isInstanceOf(time, Cesium.JulianDate)) {
                Failure.throwTypeError("time is not an instance of JulianDate")
            }
            Global.viewer.clock.currentTime = time;
        },
        /**
         * Sets the cesium clock to the provided start and stop time
         * @param {Object} clockOptions - options object for clock
         */
        setClock: function (clockOptions) {
            var clock = Global.viewer.clock;
            if (!TypeCheck.isDefined(clockOptions)) {
                Failure.throwTypeError("clockOptions is null or undefined");
            }
            if (!TypeCheck.isDefined(clockOptions.startTime) || !TypeCheck.isDefined(clockOptions.stopTime)) {
                Failure.throwTypeError("startTime or stopTime are null or undefined");
            }
            if (!TypeCheck.isInstanceOf(clockOptions.startTime, Cesium.JulianDate) ||
                !TypeCheck.isInstanceOf(clockOptions.stopTime, Cesium.JulianDate)) {
                console.error("startTime or stopTime are not instance of Cesium.JulianDate");
            }

            var defaultOptions = {
                clockRange: Cesium.ClockRange.LOOP_STOP
            };

            clockOptions = Merge(defaultOptions, clockOptions);

            clock.startTime = clockOptions.startTime;
            clock.stopTime = clockOptions.stopTime;
            clock.currentTime = clockOptions.startTime;
            clock.clockRange = clockOptions.clockRange;

            if (TypeCheck.isDefined(Global.viewer.timeline)) {
                Global.viewer.timeline.zoomTo(clockOptions.startTime, clockOptions.stopTime);
            }

            return true;
        },
        /**
         * Extends the clock span with the new values. if for example the updateStartTime is bigger then
         * the actual start time, the updateStartTime whill be ignored. Same for updateStopTime
         * @param {Cesium.JulianDate} updateStartTime - the new start time for cesium clock
         * @param {Cesium.JulianDate} updateStopTime - the new stop time for cesium clock
         */
        extendClock: function (updateStartTime, updateStopTime) {
            var currentClockStartTime = this.getCurrentStartTime();
            var currentClockStopTime = this.getCurrentStopTime();
            var startTime = Cesium.JulianDate.lessThan(updateStartTime, currentClockStartTime) ? updateStartTime : currentClockStartTime;
            var stopTime = Cesium.JulianDate.greaterThan(updateStopTime, currentClockStopTime) ? updateStopTime : currentClockStopTime;
            this.setClock({
                startTime: startTime,
                stopTime: stopTime
            });
        },
        /**
         * Registers a callback, which gets called, every time the clock ticks
         * @param {Function} fn - callback
         */
        registerCallback: function (fn) {
            Global.viewer.clock.onTick.addEventListener(fn);
        },
        /** */
        getCurrentStartTime: function () {
            return Global.viewer.clock.startTime;
        },
        /** */
        getCurrentStopTime: function () {
            return Global.viewer.clock.stopTime;
        },
        /** */
        getClock: function () {
            return Global.viewer.clock;
        }
    };
});

