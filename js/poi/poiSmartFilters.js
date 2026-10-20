const equals = (property, value) => [
    "==",
    ["get", property],
    value
];

const hasType = (...types) => [
    "any",
    ...types.flatMap(type => [
        equals("class", type),
        equals("subclass", type)
    ])
];

const nameContains = (pattern) => [
    ">=",
    [
        "index-of",
        pattern,
        ["downcase", ["to-string", ["get", "name"]]]
    ],
    0
];

const fastFood = hasType("fast_food");

const pizzaName = [
    "any",
    nameContains("pizza"),
    nameContains("pizzeria")
];

const burgerName = nameContains("burger");

export const smartFilters = {
    restaurant: hasType("restaurant"),

    cafe: hasType("cafe"),

    pizza: [
        "all",
        fastFood,
        pizzaName
    ],

    burger: [
        "all",
        fastFood,
        burgerName,
        ["!", pizzaName]
    ],

    fastFood: [
        "all",
        fastFood,
        ["!", pizzaName],
        ["!", burgerName]
    ],

    grocery: hasType(
        "supermarket",
        "convenience",
        "grocery",
        "bakery",
        "butcher",
        "deli"
    ),

    hospital: hasType("hospital"),

    fuel: hasType("fuel"),

    police: hasType("police"),

    gym: hasType("fitness_centre", "gym")
};