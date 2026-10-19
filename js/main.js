
import { DEBUG } from "./config.js";

import { createMap } from "./map/createMap.js";
import { addMapControls } from "./map/controls.js";

import { loadIcons } from "./icons/iconLoader.js";

import { addPoiLayers } from "./poi/poiLayers.js";
import { enablePoiDebug } from "./poi/poiDebug.js";

const map = createMap();

addMapControls(map);

map.on("load", async () => {
    try {
        await loadIcons(map);

        addPoiLayers(map);

        if (DEBUG) {
            enablePoiDebug(map);
        }

        console.log("GameMaps initialized");
    } catch (error) {
        console.error("GameMaps initialization failed:", error);
    }
});

map.on("error", (event) => {
    console.error("MapLibre error:", event.error);
});
