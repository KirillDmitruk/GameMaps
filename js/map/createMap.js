
import { MAP_CONFIG } from "../config.js";

export function createMap() {
    return new maplibregl.Map(MAP_CONFIG);
}
