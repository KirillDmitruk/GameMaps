
import { POI_CONFIG } from "../config.js";

import {
    restaurantFilter,
    cafeFilter,
    foodVariantFilter
} from "./poiFilters.js";

function addPoiLayer(map, id, icon, filter) {
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
    addPoiLayer(
        map,
        "game-restaurant",
        "restaurant",
        restaurantFilter
    );

    addPoiLayer(
        map,
        "game-cafe",
        "cafe",
        cafeFilter
    );

    const foodIcons = ["burger", "pizza", "chicken"];

    foodIcons.forEach((icon, index) => {
        addPoiLayer(
            map,
            `game-food-${icon}`,
            icon,
            foodVariantFilter(index)
        );
    });

    console.log("All POI layers added");
}
