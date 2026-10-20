import { describe, it, expect, vi } from "vitest";
import { addPoiLayers } from "../js/poi/poiLayers.js";
import { smartFilters } from "../js/poi/poiSmartFilters.js";
import { POI_ICON_MAP } from "../js/icons/iconConfig.js";

function createMockMap() {
    return {
        addLayer: vi.fn(),
        getLayer: vi.fn(() => undefined)
    };
}

describe("Smart POI layers", () => {
    it("creates a layer for each configured category", () => {
        const map = createMockMap();

        addPoiLayers(map);

        expect(map.addLayer).toHaveBeenCalledTimes(
            Object.keys(smartFilters).length
        );
    });

    it("uses the correct icons", () => {
        const map = createMockMap();

        addPoiLayers(map);

        const layers = map.addLayer.mock.calls.map(([layer]) => layer);

        for (const category of Object.keys(smartFilters)) {
            const layer = layers.find(
                item => item.id === `game-${category}`
            );

            expect(layer).toBeDefined();
            expect(layer.layout["icon-image"]).toBe(
                POI_ICON_MAP[category]
            );
        }
    });

    it("does not add duplicate layers", () => {
        const map = createMockMap();

        map.getLayer.mockImplementation(id =>
            id === "game-cafe" ? { id } : undefined
        );

        addPoiLayers(map);

        const layerIds = map.addLayer.mock.calls.map(
            ([layer]) => layer.id
        );

        expect(layerIds).not.toContain("game-cafe");
    });
});