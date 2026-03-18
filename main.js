// 🔹 ArcGIS Map Components
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-search";
import "@arcgis/map-components/dist/components/arcgis-layer-list";
import "@arcgis/map-components/dist/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-basemap-gallery";

// 🔹 Calcite Components (UI)
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";

// 🔹 Core config
import esriConfig from "@arcgis/core/config";

// 🔑 API KEY (replace this)
esriConfig.apiKey = "aTkT7ToOCRdMpcpndOcf6vA..h2vgn-j0W7_OlQRdjV1ab_JYDxLjmQodWZvpQ7bUHe6OEmmf8oSfFB83hSuU6SaIG4ZNv3sDaTAnNcDxH0ZmSX3ADray7mod1npTLd7t-1S57WaK119dE1MqfopoiTewt9A7v0Hi1rFdU6g.";

// 🔹 Get map element
const mapEl = document.getElementById("map");

// 🔹 Wait for map/view to be ready
mapEl.addEventListener("arcgisViewReadyChange", async (event) => {
  const view = event.target.view;

  try {
    // Ensure map is fully loaded
    await view.when();

    console.log("✅ Map is ready");

    // 🔔 Ask user permission to move to location
    const userConsent = window.confirm(
      "Do you want to move to your current location?"
    );

    if (userConsent && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const longitude = pos.coords.longitude;
          const latitude = pos.coords.latitude;

          console.log("📍 User location:", longitude, latitude);

          // 🚀 Move map to user location
          await view.goTo({
            center: [longitude, latitude],
            zoom: 15
          });
        },
        (error) => {
          console.error("❌ Location error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.log("ℹ️ User denied location access");
    }

    // 🔍 OPTIONAL: Listen to search results (for debug / extension)
    const search = document.querySelector("arcgis-search");

    if (search) {
      search.addEventListener("arcgisSearchSelectResult", (event) => {
        console.log("🔍 Search result:", event.detail.result);
      });
    }

  } catch (err) {
    console.error("❌ View error:", err);
  }
});