
const propertyEquals = (property, value) => [
    "==",
    ["get", property],
    value
];

export const restaurantFilter = [
    "any",
    propertyEquals("class", "restaurant"),
    propertyEquals("subclass", "restaurant")
];

export const cafeFilter = [
    "any",
    propertyEquals("class", "cafe"),
    propertyEquals("subclass", "cafe")
];

export const foodFilter = [
    "all",
    [
        "any",
        ...[
            "fast_food",
            "supermarket",
            "convenience",
            "grocery",
            "bakery",
            "butcher",
            "deli"
        ].flatMap(type => [
            propertyEquals("class", type),
            propertyEquals("subclass", type)
        ])
    ],
    ["!", restaurantFilter],
    ["!", cafeFilter]
];

export function foodVariantFilter(variant) {
    return [
        "all",
        foodFilter,
        [
            "==",
            [
                "%",
                [
                    "to-number",
                    ["get", "rank"],
                    0
                ],
                3
            ],
            variant
        ]
    ];
}
