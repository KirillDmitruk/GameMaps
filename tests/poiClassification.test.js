
import { describe, it, expect } from "vitest";
import { featureFilter } from "@maplibre/maplibre-gl-style-spec";

import {
    restaurantFilter,
    cafeFilter,
    foodFilter,
    foodVariantFilter
} from "../js/poi/poiFilters.js";

function matches(filter, properties) {
    const compiled = featureFilter(
        filter,
        "layers[0].filter"
    );

    return compiled.filter(
        { zoom: 16 },
        { type: 1, properties }
    );
}

describe("POI classification", () => {
    it.each([
        [{ class: "restaurant" }, true],
        [{ subclass: "restaurant" }, true],
        [{ class: "cafe" }, false],
        [{ class: "fast_food" }, false]
    ])("classifies restaurants correctly", (poi, expected) => {
        expect(matches(restaurantFilter, poi)).toBe(expected);
    });

    it.each([
        [{ class: "cafe" }, true],
        [{ subclass: "cafe" }, true],
        [{ class: "restaurant" }, false]
    ])("classifies cafes correctly", (poi, expected) => {
        expect(matches(cafeFilter, poi)).toBe(expected);
    });

    it.each([
        [{ class: "fast_food" }, true],
        [{ subclass: "bakery" }, true],
        [{ class: "restaurant", subclass: "fast_food" }, false],
        [{ class: "cafe", subclass: "bakery" }, false]
    ])("classifies food correctly", (poi, expected) => {
        expect(matches(foodFilter, poi)).toBe(expected);
    });

    it.each([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 0],
        [4, 1],
        [5, 2]
    ])("assigns rank %i to variant %i", (rank, variant) => {
        expect(
            matches(foodVariantFilter(variant), {
                class: "fast_food",
                rank
            })
        ).toBe(true);
    });
});
