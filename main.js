import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-search";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-button";

import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";

// 🔑 Optional but recommended
esriConfig.apiKey = "3efb6aa9e8674c9683f67db6d560a996";

const mapEl = document.getElementById("map");

mapEl.addEventListener("arcgisViewReadyChange", async (event) => {
  const view = event.target.view;

  // 🌍 1. Zoom to user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const point = {
        type: "point",
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude
      };

      view.goTo({
        center: [point.longitude, point.latitude],
        zoom: 14
      });
    });
  }

  // ➕ Graphics layer for buffer
  const graphicsLayer = new GraphicsLayer();
  view.map.add(graphicsLayer);

  let clickedPoint = null;

  // 📍 Capture click point
  view.on("click", (event) => {
    clickedPoint = event.mapPoint;

    graphicsLayer.removeAll();

    const pointGraphic = new Graphic({
      geometry: clickedPoint,
      symbol: {
        type: "simple-marker",
        color: "red",
        size: "10px"
      }
    });

    graphicsLayer.add(pointGraphic);
  });

  // 🔘 Buffer button
  document.getElementById("bufferBtn").addEventListener("click", () => {
    if (!clickedPoint) {
      alert("Click on map first");
      return;
    }

    // 🧠 Create buffer (e.g., 1 km)
    const buffer = geometryEngine.buffer(clickedPoint, 1, "kilometers");

    const bufferGraphic = new Graphic({
      geometry: buffer,
      symbol: {
        type: "simple-fill",
        color: [0, 0, 255, 0.2],
        outline: {
          color: "blue",
          width: 2
        }
      }
    });

    graphicsLayer.add(bufferGraphic);
  });
});