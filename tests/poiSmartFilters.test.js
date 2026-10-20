import { describe, it, expect } from "vitest";
import { featureFilter } from "@maplibre/maplibre-gl-style-spec";
import { smartFilters } from "../js/poi/poiSmartFilters.js";

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

describe("Smart POI classification", () => {
    it("recognizes pizza restaurants", () => {
        expect(matches(smartFilters.pizza, {
            class: "fast_food",
            name: "Pizza Hut"
        })).toBe(true);
    });

    it("recognizes pizza anywhere in the name", () => {
        expect(matches(smartFilters.pizza, {
            class: "fast_food",
            name: "Joe's Pizza"
        })).toBe(true);
    });

    it("recognizes burger restaurants", () => {
        expect(matches(smartFilters.burger, {
            class: "fast_food",
            name: "Burger King"
        })).toBe(true);
    });

    it("uses generic fast food for unknown names", () => {
        expect(matches(smartFilters.fastFood, {
            class: "fast_food",
            name: "Quick Bite"
        })).toBe(true);
    });

    it("recognizes hospitals", () => {
        expect(matches(smartFilters.hospital, {
            class: "hospital"
        })).toBe(true);
    });

    it("recognizes gas stations", () => {
        expect(matches(smartFilters.fuel, {
            class: "fuel"
        })).toBe(true);
    });

    it("recognizes police stations", () => {
        expect(matches(smartFilters.police, {
            class: "police"
        })).toBe(true);
    });

    it("recognizes gyms", () => {
        expect(matches(smartFilters.gym, {
            subclass: "fitness_centre"
        })).toBe(true);
    });
});