
export function enablePoiDebug(map) {
    map.on("click", (event) => {
        const features = map.queryRenderedFeatures(
            event.point,
            {
                layers: [
                    "game-restaurant",
                    "game-cafe",
                    "game-food-burger",
                    "game-food-pizza",
                    "game-food-chicken"
                ]
            }
        );

        features.forEach(feature => {
            console.table({
                name: feature.properties?.name,
                class: feature.properties?.class,
                subclass: feature.properties?.subclass,
                rank: feature.properties?.rank
            });
        });
    });
}
