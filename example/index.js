require(["CesiumAssistant", "css!bootstrap"], function (CesiumAssistant) {
    CesiumAssistant.init("lib/cesium/Build/Cesium");
    CesiumAssistant.Imagery.add({
        type: "wms",
        url: "http://localhost:8080/geoserver/gwc/service/wms",
        layers: "Base:Blue_Marble"
    });
    CesiumAssistant.Imagery.remove("Base:Blue_Marble");
});