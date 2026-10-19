
export function addMapControls(map) {
    map.addControl(
        new maplibregl.NavigationControl(),
        "top-right"
    );
}
