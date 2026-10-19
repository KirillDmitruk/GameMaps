
import { describe, it, expect } from "vitest";

import {
    restaurantFilter,
    cafeFilter,
    foodFilter,
    foodVariantFilter
} from "../js/poi/poiFilters.js";

describe("POI Filters", () => {

    it("recognizes restaurant by class", () => {
        expect(restaurantFilter).toContainEqual([
            "==",
            ["get", "class"],
            "restaurant"
        ]);
    });

    it("recognizes cafe by subclass", () => {
        expect(cafeFilter).toContainEqual([
            "==",
            ["get", "subclass"],
            "cafe"
        ]);
    });

    it("includes fast_food category", () => {
        const serialized = JSON.stringify(foodFilter);

        expect(serialized).toContain("fast_food");
    });

    it("includes bakery category", () => {
        const serialized = JSON.stringify(foodFilter);

        expect(serialized).toContain("bakery");
    });

    it("excludes restaurants from food", () => {
        expect(foodFilter).toContainEqual([
            "!",
            restaurantFilter
        ]);
    });

    it("excludes cafes from food", () => {
        expect(foodFilter).toContainEqual([
            "!",
            cafeFilter
        ]);
    });

    it.each([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 0]
    ])("maps rank %i to variant %i", (rank, variant) => {
        expect(rank % 3).toBe(variant);
    });

    it("creates a food variant filter", () => {
        const filter = foodVariantFilter(1);

        expect(filter[0]).toBe("all");
        expect(filter).toContainEqual(foodFilter);
    });
});
