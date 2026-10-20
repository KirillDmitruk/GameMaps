import { POI_CONFIG } from "../config.js";
import { smartFilters } from "./poiSmartFilters.js";
import { POI_ICON_MAP } from "../icons/iconConfig.js";

export function addPoiLayer(map, id, icon, filter) {
    map.addLayer({
        id,
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "poi",
        minzoom: POI_CONFIG.minZoom,

        filter,

        layout: {
            "icon-image": icon,
            "icon-size": POI_CONFIG.iconSize,
            "icon-allow-overlap": POI_CONFIG.allowOverlap,
            "icon-ignore-placement": POI_CONFIG.ignorePlacement
        }
    });
}

export function addPoiLayers(map) {
    for (const [category, filter] of Object.entries(smartFilters)) {
        const icon = POI_ICON_MAP[category];

        if (!icon) {
            console.warn(`No icon configured for category: ${category}`);
            continue;
        }

        const layerId = `game-${category}`;

        if (map.getLayer(layerId)) {
            continue;
        }

        addPoiLayer(map, layerId, icon, filter);

        console.log(`POI layer added: ${layerId}`);
    }

    console.log("All smart POI layers added");
}