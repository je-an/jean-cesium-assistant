require(["CesiumAssistant", "css!bootstrap"], function (CesiumAssistant) {
    CesiumAssistant.init("lib/cesium/Build/Cesium");
    CesiumAssistant.Imagery.add({
        type: "wms",
        url: "http://localhost:8080/geoserver/gwc/service/wms",
        layerName: "Base:Blue_Marble"
    });
    CesiumAssistant.Imagery.add({
        type: "wms",
        url: "http://localhost:8080/geoserver/gwc/service/wms",
        layerName: "Base:Border_Germany"
    });
    CesiumAssistant.Camera.flyToBounding(3, {
        westLongitude: 5.8662505149842445,
        eastLongitude: 15.041815757751465,
        southLatitude: 47.27012252807623,
        northLatitude: 55.05652618408203
    });
    CesiumAssistant.Terrain.add({
        url: "http://localhost:8080/geoserver/gwc/service/wms",
        layer: "Terrain:Terrain"
    });
});