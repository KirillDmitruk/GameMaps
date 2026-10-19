
import { ICONS } from "./iconConfig.js";

export async function loadIcons(map) {
    for (const [name, path] of Object.entries(ICONS)) {
        const image = await map.loadImage(path);

        if (map.hasImage(name)) {
            map.updateImage(name, image.data);
        } else {
            map.addImage(name, image.data);
        }

        console.log(`Icon loaded: ${name}`);
    }
}
