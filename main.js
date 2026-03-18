import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-search";
import "@arcgis/map-components/dist/components/arcgis-layer-list";
import "@arcgis/map-components/dist/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-basemap-gallery";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";

import esriConfig from "@arcgis/core/config";

// 🔑 API Key
esriConfig.apiKey = "aTkT7ToOCRdMpcpndOcf6vA..h2vgn-j0W7_OlQRdjV1ab_JYDxLjmQodWZvpQ7bUHe6OEmmf8oSfFB83hSuU6SaIG4ZNv3sDaTAnNcDxH0ZmSX3ADray7mod1npTLd7t-1S57WaK119dE1MqfopoiTewt9A7v0Hi1rFdU6g.";

const mapEl = document.getElementById("map");

mapEl.addEventListener("arcgisViewReadyChange", async (event) => {
  const view = event.target.view;

  // ✅ Ensure map fully loaded
  await view.when();

  // 🌍 Auto zoom to user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const point = {
          type: "point",
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude
        };

        await view.goTo({
          target: point,
          zoom: 15
        });
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }
});