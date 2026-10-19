import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { validateStyleMin } from "@maplibre/maplibre-gl-style-spec";

const stylePath = new URL("../styles/gta_sa.json", import.meta.url);

describe("GTA San Andreas map style", () => {
    it("contains valid JSON", () => {
        const content = readFileSync(stylePath, "utf8");

        expect(() => JSON.parse(content)).not.toThrow();
    });

    it("follows the MapLibre style specification", () => {
        const style = JSON.parse(readFileSync(stylePath, "utf8"));

        const errors = validateStyleMin(style);

        expect(errors).toEqual([]);
    });

    it("contains required style sections", () => {
        const style = JSON.parse(readFileSync(stylePath, "utf8"));

        expect(style.version).toBe(8);
        expect(style.sources).toBeDefined();
        expect(Array.isArray(style.layers)).toBe(true);
        expect(style.layers.length).toBeGreaterThan(0);
    });
});