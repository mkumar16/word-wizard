// Word Wizard Game Logic

// Category Metadata
const categories = {
    general:    { name: 'General',    icon: '🔤', color: '#6366f1' },
    colors:     { name: 'Colors',     icon: '🎨', color: '#ec4899' },
    numbers:    { name: 'Numbers',    icon: '🔢', color: '#f59e0b' },
    fruits:     { name: 'Fruits',     icon: '🍎', color: '#10b981' },
    vegetables: { name: 'Vegetables', icon: '🥕', color: '#f97316' },
    animals:    { name: 'Animals',    icon: '🦁', color: '#8b5cf6' },
    birds:      { name: 'Birds',      icon: '🐦', color: '#06b6d4' },
    vehicles:   { name: 'Vehicles',   icon: '🚗', color: '#ef4444' },
    bodyParts:  { name: 'Body Parts', icon: '🫀', color: '#dc2626' },
    clothing:   { name: 'Clothing',   icon: '👕', color: '#3b82f6' },
    weather:    { name: 'Weather',    icon: '🌤️', color: '#0ea5e9' },
    food:       { name: 'Food',       icon: '🍕', color: '#eab308' },
    countries:  { name: 'Countries',  icon: '🌍', color: '#22c55e' },
    shapes:     { name: 'Shapes',     icon: '⬛', color: '#64748b' },
    toys:       { name: 'Toys',       icon: '🧸', color: '#a855f7' }
};

// Word Database organized by category and level
const wordDatabase = {
    general: {
        1: [
            { word: 'CAT', hint: '🐱' }, { word: 'DOG', hint: '🐕' }, { word: 'SUN', hint: '☀️' },
            { word: 'HAT', hint: '🎩' }, { word: 'CUP', hint: '☕' }, { word: 'BED', hint: '🛏️' },
            { word: 'PEN', hint: '🖊️' }, { word: 'BUS', hint: '🚌' }, { word: 'KEY', hint: '🔑' },
            { word: 'BOX', hint: '📦' }, { word: 'JAR', hint: '🫙' }, { word: 'PIG', hint: '🐷' },
            { word: 'BAT', hint: '🦇' }, { word: 'FOX', hint: '🦊' }, { word: 'ANT', hint: '🐜' }
        ],
        2: [
            { word: 'FISH', hint: '🐟' }, { word: 'BIRD', hint: '🐦' }, { word: 'TREE', hint: '🌳' },
            { word: 'BOOK', hint: '📚' }, { word: 'STAR', hint: '⭐' }, { word: 'MOON', hint: '🌙' },
            { word: 'FROG', hint: '🐸' }, { word: 'BEAR', hint: '🐻' }, { word: 'LION', hint: '🦁' },
            { word: 'CAKE', hint: '🎂' }, { word: 'BELL', hint: '🔔' }, { word: 'FORK', hint: '🍴' },
            { word: 'DOOR', hint: '🚪' }, { word: 'FARM', hint: '🌾' }, { word: 'NEST', hint: '🪺' }
        ],
        3: [
            { word: 'APPLE', hint: '🍎' }, { word: 'TIGER', hint: '🐯' }, { word: 'HAPPY', hint: '😊' },
            { word: 'CANDY', hint: '🍬' }, { word: 'MUSIC', hint: '🎵' }, { word: 'WATER', hint: '💧' },
            { word: 'HOUSE', hint: '🏠' }, { word: 'TRAIN', hint: '🚂' }, { word: 'CLOUD', hint: '☁️' },
            { word: 'SMILE', hint: '😄' }, { word: 'DANCE', hint: '💃' }, { word: 'PLANT', hint: '🌱' },
            { word: 'TABLE', hint: '🪑' }, { word: 'CHAIR', hint: '🪑' }, { word: 'PHONE', hint: '📱' }
        ],
        4: [
            { word: 'BANANA', hint: '🍌' }, { word: 'DRAGON', hint: '🐉' }, { word: 'FLOWER', hint: '🌸' },
            { word: 'ROCKET', hint: '🚀' }, { word: 'PLANET', hint: '🪐' }, { word: 'ORANGE', hint: '🍊' },
            { word: 'GARDEN', hint: '🌻' }, { word: 'BRIDGE', hint: '🌉' }, { word: 'CASTLE', hint: '🏰' },
            { word: 'FATHER', hint: '👨' }, { word: 'MOTHER', hint: '👩' }, { word: 'SCHOOL', hint: '🏫' },
            { word: 'SUNDAY', hint: '📅' }, { word: 'SUMMER', hint: '☀️' }, { word: 'WINTER', hint: '❄️' }
        ],
        5: [
            { word: 'PENGUIN', hint: '🐧' }, { word: 'ELEPHANT', hint: '🐘' }, { word: 'UMBRELLA', hint: '☂️' },
            { word: 'RAINBOW', hint: '🌈' }, { word: 'BUTTERFLY', hint: '🦋' }, { word: 'DOLPHIN', hint: '🐬' },
            { word: 'MONKEY', hint: '🐵' }, { word: 'TURTLE', hint: '🐢' }, { word: 'BALLOON', hint: '🎈' },
            { word: 'PUMPKIN', hint: '🎃' }, { word: 'SPIDER', hint: '🕷️' }, { word: 'RAINBOW', hint: '🌈' },
            { word: 'DIAMOND', hint: '💎' }, { word: 'CLOWN', hint: '🤡' }, { word: 'WIZARD', hint: '🧙' }
        ]
    },
    colors: {
        1: [
            { word: 'RED', hint: '🔴' }, { word: 'PINK', hint: '🩷' }, { word: 'TAN', hint: '🟤' },
            { word: 'TEAL', hint: '🟢' }, { word: 'CYAN', hint: '🔵' }, { word: 'RUBY', hint: '💎' },
            { word: 'JADE', hint: '🟩' }, { word: 'IVORY', hint: '🤍' }, { word: 'CORAL', hint: '🪸' },
            { word: 'GOLD', hint: '🥇' }, { word: 'KHAKI', hint: '🟫' }, { word: 'LIME', hint: '🟩' },
            { word: 'PLUM', hint: '🟣' }, { word: 'RUST', hint: '🟤' }, { word: 'SAND', hint: '🏖️' }
        ],
        2: [
            { word: 'BLUE', hint: '🔵' }, { word: 'GRAY', hint: '⬜' }, { word: 'GOLD', hint: '🥇' },
            { word: 'AZURE', hint: '💙' }, { word: 'BEIGE', hint: '🟨' }, { word: 'CREAM', hint: '🤍' },
            { word: 'DUSK', hint: '🌅' }, { word: 'HAZEL', hint: '🟤' }, { word: 'MOSS', hint: '🌿' },
            { word: 'OLIVE', hint: '🫒' }, { word: 'PEARL', hint: '🤍' }, { word: 'ROSE', hint: '🌹' },
            { word: 'RUBY', hint: '💎' }, { word: 'TEAL', hint: '🌊' }, { word: 'WINE', hint: '🍷' }
        ],
        3: [
            { word: 'GREEN', hint: '🟢' }, { word: 'WHITE', hint: '⬜' }, { word: 'BLACK', hint: '⬛' },
            { word: 'BROWN', hint: '🟤' }, { word: 'OCHRE', hint: '🟨' }, { word: 'PEACH', hint: '🍑' },
            { word: 'CORAL', hint: '🪸' }, { word: 'LILAC', hint: '💜' }, { word: 'AMBER', hint: '🟠' },
            { word: 'IVORY', hint: '🤍' }, { word: 'SMOKE', hint: '💨' }, { word: 'STEEL', hint: '⚙️' },
            { word: 'BRONZE', hint: '🥉' }, { word: 'CHERRY', hint: '🍒' }, { word: 'INDIGO', hint: '💙' }
        ],
        4: [
            { word: 'ORANGE', hint: '🟠' }, { word: 'PURPLE', hint: '🟣' }, { word: 'YELLOW', hint: '🟡' },
            { word: 'SILVER', hint: '🥈' }, { word: 'MAROON', hint: '🟤' }, { word: 'VIOLET', hint: '💜' },
            { word: 'INDIGO', hint: '💙' }, { word: 'MAGENTA', hint: '🟣' }, { word: 'SALMON', hint: '🐟' },
            { word: 'APRICOT', hint: '🍑' }, { word: 'OLIVE', hint: '🫒' }, { word: 'COPPER', hint: '🥉' },
            { word: 'CRIMSON', hint: '🔴' }, { word: 'SCARLET', hint: '🔴' }, { word: 'CARMINE', hint: '🔴' }
        ],
        5: [
            { word: 'TURQUOISE', hint: '🟢' }, { word: 'LAVENDER', hint: '💜' }, { word: 'MAGENTA', hint: '🟣' },
            { word: 'CRIMSON', hint: '🔴' }, { word: 'SCARLET', hint: '🔴' }, { word: 'EMERALD', hint: '💚' },
            { word: 'SAPPHIRE', hint: '💙' }, { word: 'AMETHYST', hint: '💜' }, { word: 'CHARCOAL', hint: '⬛' },
            { word: 'CERISE', hint: '🔴' }, { word: 'FUCHSIA', hint: '🟣' }, { word: 'VERMILION', hint: '🔴' },
            { word: 'AUBURN', hint: '🟤' }, { word: 'SIENNA', hint: '🟤' }, { word: 'OCHRE', hint: '🟨' }
        ]
    },
    numbers: {
        1: [
            { word: 'ONE', hint: '1️⃣' }, { word: 'TWO', hint: '2️⃣' }, { word: 'SIX', hint: '6️⃣' },
            { word: 'TEN', hint: '🔟' }, { word: 'NUL', hint: '0️⃣' }, { word: 'NIL', hint: '0️⃣' },
            { word: 'ADD', hint: '➕' }, { word: 'SUM', hint: '➕' }, { word: 'ODD', hint: '🔢' },
            { word: 'EVEN', hint: '🔢' }, { word: 'BIG', hint: '🔢' }, { word: 'TINY', hint: '🔢' },
            { word: 'LOT', hint: '🔢' }, { word: 'FEW', hint: '🔢' }, { word: 'PAIR', hint: '2️⃣' }
        ],
        2: [
            { word: 'FOUR', hint: '4️⃣' }, { word: 'FIVE', hint: '5️⃣' }, { word: 'NINE', hint: '9️⃣' },
            { word: 'ZERO', hint: '0️⃣' }, { word: 'TENS', hint: '🔟' }, { word: 'HALF', hint: '½' },
            { word: 'QUARTER', hint: '¼' }, { word: 'DOZEN', hint: '📦' }, { word: 'SCORE', hint: '🏆' },
            { word: 'GROSS', hint: '📦' }, { word: 'TOTAL', hint: '📊' }, { word: 'COUNT', hint: '🔢' },
            { word: 'PLUS', hint: '➕' }, { word: 'MINUS', hint: '➖' }, { word: 'EQUAL', hint: '🟰' }
        ],
        3: [
            { word: 'THREE', hint: '3️⃣' }, { word: 'SEVEN', hint: '7️⃣' }, { word: 'EIGHT', hint: '8️⃣' },
            { word: 'TWENTY', hint: '2️⃣0️⃣' }, { word: 'THIRTY', hint: '3️⃣0️⃣' }, { word: 'FORTY', hint: '4️⃣0️⃣' },
            { word: 'FIFTY', hint: '5️⃣0️⃣' }, { word: 'SIXTY', hint: '6️⃣0️⃣' }, { word: 'HUNDRED', hint: '💯' },
            { word: 'THOUSAND', hint: '🔢' }, { word: 'MILLION', hint: '🔢' }, { word: 'BILLION', hint: '🔢' },
            { word: 'FRACTION', hint: '½' }, { word: 'DECIMAL', hint: '🔢' }, { word: 'INTEGER', hint: '🔢' }
        ],
        4: [
            { word: 'ELEVEN', hint: '1️⃣1️⃣' }, { word: 'TWELVE', hint: '1️⃣2️⃣' }, { word: 'THIRTEEN', hint: '1️⃣3️⃣' },
            { word: 'FOURTEEN', hint: '1️⃣4️⃣' }, { word: 'FIFTEEN', hint: '1️⃣5️⃣' }, { word: 'SIXTEEN', hint: '1️⃣6️⃣' },
            { word: 'SEVENTEEN', hint: '1️⃣7️⃣' }, { word: 'EIGHTEEN', hint: '1️⃣8️⃣' }, { word: 'NINETEEN', hint: '1️⃣9️⃣' },
            { word: 'TWENTY', hint: '2️⃣0️⃣' }, { word: 'FORTY', hint: '4️⃣0️⃣' }, { word: 'FIFTY', hint: '5️⃣0️⃣' },
            { word: 'SIXTY', hint: '6️⃣0️⃣' }, { word: 'SEVENTY', hint: '7️⃣0️⃣' }, { word: 'EIGHTY', hint: '8️⃣0️⃣' }
        ],
        5: [
            { word: 'THIRTY', hint: '3️⃣0️⃣' }, { word: 'NINETY', hint: '9️⃣0️⃣' }, { word: 'HUNDRED', hint: '💯' },
            { word: 'THOUSAND', hint: '🔢' }, { word: 'MILLION', hint: '🔢' }, { word: 'BILLION', hint: '🔢' },
            { word: 'TRILLION', hint: '🔢' }, { word: 'QUARTER', hint: '¼' }, { word: 'FRACTION', hint: '½' },
            { word: 'DECIMAL', hint: '🔢' }, { word: 'INTEGER', hint: '🔢' }, { word: 'PERCENT', hint: '%' },
            { word: 'NUMBER', hint: '🔢' }, { word: 'DIGIT', hint: '🔢' }, { word: 'COUNT', hint: '🔢' }
        ]
    },
    fruits: {
        1: [
            { word: 'FIG', hint: '🫐' }, { word: 'PEAR', hint: '🍐' }, { word: 'KIWI', hint: '🥝' },
            { word: 'LIME', hint: '🟢' }, { word: 'DATE', hint: '🌴' }, { word: 'PLUM', hint: '🟣' },
            { word: 'BERRY', hint: '🫐' }, { word: 'MELON', hint: '🍈' }, { word: 'PEACH', hint: '🍑' },
            { word: 'GRAPE', hint: '🍇' }, { word: 'LEMON', hint: '🍋' }, { word: 'OLIVE', hint: '🫒' },
            { word: 'MANGO', hint: '🥭' }, { word: 'APPLE', hint: '🍎' }, { word: 'GUAVA', hint: '🍈' }
        ],
        2: [
            { word: 'APPLE', hint: '🍎' }, { word: 'GRAPE', hint: '🍇' }, { word: 'MANGO', hint: '🥭' },
            { word: 'LEMON', hint: '🍋' }, { word: 'MELON', hint: '🍈' }, { word: 'BERRY', hint: '🫐' },
            { word: 'PLUM', hint: '🟣' }, { word: 'PEAR', hint: '🍐' }, { word: 'KIWI', hint: '🥝' },
            { word: 'LIME', hint: '🟢' }, { word: 'FIG', hint: '🫐' }, { word: 'DATE', hint: '🌴' },
            { word: 'PEACH', hint: '🍑' }, { word: 'OLIVE', hint: '🫒' }, { word: 'GUAVA', hint: '🍈' }
        ],
        3: [
            { word: 'BANANA', hint: '🍌' }, { word: 'CHERRY', hint: '🍒' }, { word: 'ORANGE', hint: '🍊' },
            { word: 'PAPAYA', hint: '🥭' }, { word: 'MELON', hint: '🍈' }, { word: 'MANGO', hint: '🥭' },
            { word: 'APPLE', hint: '🍎' }, { word: 'GRAPE', hint: '🍇' }, { word: 'LEMON', hint: '🍋' },
            { word: 'PEAR', hint: '🍐' }, { word: 'PLUM', hint: '🟣' }, { word: 'KIWI', hint: '🥝' },
            { word: 'BERRY', hint: '🫐' }, { word: 'FIG', hint: '🫐' }, { word: 'DATE', hint: '🌴' }
        ],
        4: [
            { word: 'ORANGE', hint: '🍊' }, { word: 'BANANA', hint: '🍌' }, { word: 'CHERRY', hint: '🍒' },
            { word: 'PAPAYA', hint: '🥭' }, { word: 'AVOCADO', hint: '🥑' }, { word: 'COCONUT', hint: '🥥' },
            { word: 'LYCHEE', hint: '🍈' }, { word: 'DURIAN', hint: '🍈' }, { word: 'APRICOT', hint: '🍑' },
            { word: 'POMELO', hint: '🍊' }, { word: 'RAISIN', hint: '🍇' }, { word: 'PRUNE', hint: '🟣' },
            { word: 'QUINCE', hint: '🍈' }, { word: 'CURRANT', hint: '🫐' }, { word: 'TANGERINE', hint: '🍊' }
        ],
        5: [
            { word: 'PINEAPPLE', hint: '🍍' }, { word: 'WATERMELON', hint: '🍉' }, { word: 'STRAWBERRY', hint: '🍓' },
            { word: 'BLUEBERRY', hint: '🫐' }, { word: 'RASPBERRY', hint: '🍇' }, { word: 'CRANBERRY', hint: '🫐' },
            { word: 'BLACKBERRY', hint: '🫐' }, { word: 'POMEGRANATE', hint: '🍎' }, { word: 'CANTALOUPE', hint: '🍈' },
            { word: 'NECTARINE', hint: '🍑' }, { word: 'TANGERINE', hint: '🍊' }, { word: 'PERSIMMON', hint: '🍊' },
            { word: 'PASSIONFRUIT', hint: '🍈' }, { word: 'DRAGONFRUIT', hint: '🐉' }, { word: 'STARFRUIT', hint: '⭐' }
        ]
    },
    vegetables: {
        1: [
            { word: 'YAM', hint: '🍠' }, { word: 'PEA', hint: '🟢' }, { word: 'CORN', hint: '🌽' },
            { word: 'KALE', hint: '🥬' }, { word: 'BEET', hint: '🟣' }, { word: 'OKRA', hint: '🟢' },
            { word: 'LEEK', hint: '🟢' }, { word: 'CHILI', hint: '🌶️' }, { word: 'BEAN', hint: '🫘' },
            { word: 'PEA', hint: '🟢' }, { word: 'YAM', hint: '🍠' }, { word: 'KALE', hint: '🥬' },
            { word: 'BEET', hint: '🟣' }, { word: 'CORN', hint: '🌽' }, { word: 'OKRA', hint: '🟢' }
        ],
        2: [
            { word: 'BEAN', hint: '🫘' }, { word: 'CORN', hint: '🌽' }, { word: 'KALE', hint: '🥬' },
            { word: 'BEET', hint: '🟣' }, { word: 'OKRA', hint: '🟢' }, { word: 'LEEK', hint: '🟢' },
            { word: 'CHILI', hint: '🌶️' }, { word: 'YAM', hint: '🍠' }, { word: 'PEA', hint: '🟢' },
            { word: 'SQUASH', hint: '🟢' }, { word: 'RADISH', hint: '🔴' }, { word: 'TURNIP', hint: '🟣' },
            { word: 'CELERY', hint: '🟢' }, { word: 'PEPPER', hint: '🌶️' }, { word: 'CARROT', hint: '🥕' }
        ],
        3: [
            { word: 'ONION', hint: '🧅' }, { word: 'POTATO', hint: '🥔' }, { word: 'CARROT', hint: '🥕' },
            { word: 'TOMATO', hint: '🍅' }, { word: 'PEPPER', hint: '🌶️' }, { word: 'CELERY', hint: '🟢' },
            { word: 'RADISH', hint: '🔴' }, { word: 'TURNIP', hint: '🟣' }, { word: 'SQUASH', hint: '🟢' },
            { word: 'PUMPKIN', hint: '🎃' }, { word: 'LETTUCE', hint: '🥬' }, { word: 'SPINACH', hint: '🥬' },
            { word: 'BROCCOLI', hint: '🥦' }, { word: 'CABBAGE', hint: '🥬' }, { word: 'GARLIC', hint: '🧄' }
        ],
        4: [
            { word: 'POTATO', hint: '🥔' }, { word: 'ONION', hint: '🧅' }, { word: 'CARROT', hint: '🥕' },
            { word: 'TOMATO', hint: '🍅' }, { word: 'PEPPER', hint: '🌶️' }, { word: 'CELERY', hint: '🟢' },
            { word: 'RADISH', hint: '🔴' }, { word: 'TURNIP', hint: '🟣' }, { word: 'SQUASH', hint: '🟢' },
            { word: 'PUMPKIN', hint: '🎃' }, { word: 'LETTUCE', hint: '🥬' }, { word: 'SPINACH', hint: '🥬' },
            { word: 'BROCCOLI', hint: '🥦' }, { word: 'CABBAGE', hint: '🥬' }, { word: 'GARLIC', hint: '🧄' }
        ],
        5: [
            { word: 'ASPARAGUS', hint: '🟢' }, { word: 'CAULIFLOWER', hint: '🥦' }, { word: 'EGGPLANT', hint: '🍆' },
            { word: 'ZUCCHINI', hint: '🟢' }, { word: 'CUCUMBER', hint: '🥒' }, { word: 'ARTICHOKE', hint: '🟢' },
            { word: 'MUSHROOM', hint: '🍄' }, { word: 'PEPPERS', hint: '🌶️' }, { word: 'VEGETABLE', hint: '🥬' },
            { word: 'BROCCOLI', hint: '🥦' }, { word: 'CABBAGE', hint: '🥬' }, { word: 'PUMPKIN', hint: '🎃' },
            { word: 'RADISHES', hint: '🔴' }, { word: 'LETTUCES', hint: '🥬' }, { word: 'POTATOES', hint: '🥔' }
        ]
    },
    animals: {
        1: [
            { word: 'CAT', hint: '🐱' }, { word: 'DOG', hint: '🐕' }, { word: 'PIG', hint: '🐷' },
            { word: 'BAT', hint: '🦇' }, { word: 'FOX', hint: '🦊' }, { word: 'ANT', hint: '🐜' },
            { word: 'BEE', hint: '🐝' }, { word: 'FLY', hint: '🪰' }, { word: 'BUG', hint: '🐛' },
            { word: 'WORM', hint: '🪱' }, { word: 'DEER', hint: '🦌' }, { word: 'BEAR', hint: '🐻' },
            { word: 'LION', hint: '🦁' }, { word: 'SEAL', hint: '🦭' }, { word: 'WOLF', hint: '🐺' }
        ],
        2: [
            { word: 'FROG', hint: '🐸' }, { word: 'BEAR', hint: '🐻' }, { word: 'LION', hint: '🦁' },
            { word: 'DEER', hint: '🦌' }, { word: 'SEAL', hint: '🦭' }, { word: 'WOLF', hint: '🐺' },
            { word: 'FISH', hint: '🐟' }, { word: 'BIRD', hint: '🐦' }, { word: 'TREE', hint: '🌳' },
            { word: 'CAMEL', hint: '🐫' }, { word: 'SHEEP', hint: '🐑' }, { word: 'HORSE', hint: '🐴' },
            { word: 'MOUSE', hint: '🐭' }, { word: 'TIGER', hint: '🐯' }, { word: 'ZEBRA', hint: '🦓' }
        ],
        3: [
            { word: 'TIGER', hint: '🐯' }, { word: 'HORSE', hint: '🐴' }, { word: 'ZEBRA', hint: '🦓' },
            { word: 'SHEEP', hint: '🐑' }, { word: 'MOUSE', hint: '🐭' }, { word: 'CAMEL', hint: '🐫' },
            { word: 'PANDA', hint: '🐼' }, { word: 'KOALA', hint: '🐨' }, { word: 'OTTER', hint: '🦦' },
            { word: 'RABBIT', hint: '🐰' }, { word: 'MONKEY', hint: '🐵' }, { word: 'DONKEY', hint: '🫏' },
            { word: 'GOAT', hint: '🐐' }, { word: 'COW', hint: '🐄' }, { word: 'YAK', hint: '🐂' }
        ],
        4: [
            { word: 'ELEPHANT', hint: '🐘' }, { word: 'MONKEY', hint: '🐵' }, { word: 'DONKEY', hint: '🫏' },
            { word: 'GIRAFFE', hint: '🦒' }, { word: 'LEOPARD', hint: '🐆' }, { word: 'CHEETAH', hint: '🐆' },
            { word: 'JAGUAR', hint: '🐆' }, { word: 'PANTHER', hint: '🐆' }, { word: 'BABOON', hint: '🐒' },
            { word: 'GORILLA', hint: '🦍' }, { word: 'CHIMPANZEE', hint: '🐵' }, { word: 'MEERKAT', hint: '🐿️' },
            { word: 'HAMSTER', hint: '🐹' }, { word: 'RACCOON', hint: '🦝' }, { word: 'POSSUM', hint: '🦡' }
        ],
        5: [
            { word: 'ELEPHANT', hint: '🐘' }, { word: 'PENGUIN', hint: '🐧' }, { word: 'DOLPHIN', hint: '🐬' },
            { word: 'TORTOISE', hint: '🐢' }, { word: 'TURTLE', hint: '🐢' }, { word: 'CROCODILE', hint: '🐊' },
            { word: 'ALLIGATOR', hint: '🐊' }, { word: 'HIPPOPOTAMUS', hint: '🦛' }, { word: 'RHINOCEROS', hint: '🦏' },
            { word: 'BUFFALO', hint: '🦬' }, { word: 'WILDEBEEST', hint: '🦬' }, { word: 'ANTELOPE', hint: '🦌' },
            { word: 'GAZELLE', hint: '🦌' }, { word: 'PORCUPINE', hint: '🦔' }, { word: 'ARMADILLO', hint: '🦡' }
        ]
    },
    birds: {
        1: [
            { word: 'OWL', hint: '🦉' }, { word: 'HEN', hint: '🐔' }, { word: 'EMU', hint: '🦅' },
            { word: 'JAY', hint: '🐦' }, { word: 'DOVE', hint: '🕊️' }, { word: 'DUCK', hint: '🦆' },
            { word: 'SWAN', hint: '🦢' }, { word: 'CROW', hint: '🐦‍⬛' }, { word: 'LARK', hint: '🐦' },
            { word: 'FINCH', hint: '🐦' }, { word: 'ROBIN', hint: '🐦' }, { word: 'HERON', hint: '🐦' },
            { word: 'EAGLE', hint: '🦅' }, { word: 'HAWK', hint: '🦅' }, { word: 'CRANE', hint: '🐦' }
        ],
        2: [
            { word: 'CROW', hint: '🐦‍⬛' }, { word: 'DUCK', hint: '🦆' }, { word: 'SWAN', hint: '🦢' },
            { word: 'DOVE', hint: '🕊️' }, { word: 'HEN', hint: '🐔' }, { word: 'OWL', hint: '🦉' },
            { word: 'EAGLE', hint: '🦅' }, { word: 'HAWK', hint: '🦅' }, { word: 'CRANE', hint: '🐦' },
            { word: 'STORK', hint: '🐦' }, { word: 'IBIS', hint: '🐦' }, { word: 'LOON', hint: '🐦' },
            { word: 'TEAL', hint: '🦆' }, { word: 'WREN', hint: '🐦' }, { word: 'TERN', hint: '🐦' }
        ],
        3: [
            { word: 'PARROT', hint: '🦜' }, { word: 'PIGEON', hint: '🐦' }, { word: 'EAGLE', hint: '🦅' },
            { word: 'HERON', hint: '🐦' }, { word: 'FINCH', hint: '🐦' }, { word: 'ROBIN', hint: '🐦' },
            { word: 'FALCON', hint: '🦅' }, { word: 'CONDOR', hint: '🦅' }, { word: 'TOUCAN', hint: '🦜' },
            { word: 'PEACOCK', hint: '🦚' }, { word: 'PEAHEN', hint: '🦚' }, { word: 'OSTRICH', hint: '🐦' },
            { word: 'MAGPIE', hint: '🐦' }, { word: 'SPARROW', hint: '🐦' }, { word: 'QUAIL', hint: '🐦' }
        ],
        4: [
            { word: 'PELICAN', hint: '🐦' }, { word: 'KINGFISHER', hint: '🐦' }, { word: 'PENGUIN', hint: '🐧' },
            { word: 'PEACOCK', hint: '🦚' }, { word: 'OSTRICH', hint: '🐦' }, { word: 'FLAMINGO', hint: '🦩' },
            { word: 'SPARROW', hint: '🐦' }, { word: 'SWALLOW', hint: '🐦' }, { word: 'BUZZARD', hint: '🦅' },
            { word: 'VULTURE', hint: '🦅' }, { word: 'ALBATROSS', hint: '🐦' }, { word: 'CORMORANT', hint: '🐦' },
            { word: 'WOODPECKER', hint: '🐦' }, { word: 'NIGHTINGALE', hint: '🐦' }, { word: 'CANARY', hint: '🐦' }
        ],
        5: [
            { word: 'KINGFISHER', hint: '🐦' }, { word: 'PELICAN', hint: '🐦' }, { word: 'FLAMINGO', hint: '🦩' },
            { word: 'ALBATROSS', hint: '🐦' }, { word: 'CORMORANT', hint: '🐦' }, { word: 'WOODPECKER', hint: '🐦' },
            { word: 'NIGHTINGALE', hint: '🐦' }, { word: 'PEACOCKS', hint: '🦚' }, { word: 'SPARROWS', hint: '🐦' },
            { word: 'SWALLOWS', hint: '🐦' }, { word: 'BUZZARDS', hint: '🦅' }, { word: 'VULTURES', hint: '🦅' },
            { word: 'PELICANS', hint: '🐦' }, { word: 'CONDORS', hint: '🦅' }, { word: 'FALCONS', hint: '🦅' }
        ]
    },
    vehicles: {
        1: [
            { word: 'CAR', hint: '🚗' }, { word: 'BUS', hint: '🚌' }, { word: 'VAN', hint: '🚐' },
            { word: 'JET', hint: '✈️' }, { word: 'TAXI', hint: '🚕' }, { word: 'BIKE', hint: '🚲' },
            { word: 'BOAT', hint: '🚤' }, { word: 'SHIP', hint: '🚢' }, { word: 'TRAM', hint: '🚋' },
            { word: 'CAB', hint: '🚕' }, { word: 'LIMO', hint: '🚗' }, { word: 'JEEP', hint: '🚙' },
            { word: 'SLED', hint: '🛷' }, { word: 'CART', hint: '🛒' }, { word: 'WAGON', hint: '🚙' }
        ],
        2: [
            { word: 'TRUCK', hint: '🚛' }, { word: 'TRAIN', hint: '🚂' }, { word: 'PLANE', hint: '✈️' },
            { word: 'CANOE', hint: '🛶' }, { word: 'YACHT', hint: '🛥️' }, { word: 'FERRY', hint: '⛴️' },
            { word: 'SCOOTER', hint: '🛴' }, { word: 'MOPED', hint: '🏍️' }, { word: 'SEDAN', hint: '🚗' },
            { word: 'COUPE', hint: '🚗' }, { word: 'TRAILER', hint: '🚛' }, { word: 'TANKER', hint: '🚢' },
            { word: 'CRUISER', hint: '🚢' }, { word: 'RAILCAR', hint: '🚂' }, { word: 'GLIDER', hint: '🪂' }
        ],
        3: [
            { word: 'ROCKET', hint: '🚀' }, { word: 'SUBWAY', hint: '🚇' }, { word: 'CAMPER', hint: '🚐' },
            { word: 'AMBULANCE', hint: '🚑' }, { word: 'TRACTOR', hint: '🚜' }, { word: 'MOTORCYCLE', hint: '🏍️' },
            { word: 'HELICOPTER', hint: '🚁' }, { word: 'SUBMARINE', hint: '🚢' }, { word: 'AIRPLANE', hint: '✈️' },
            { word: 'SKATEBOARD', hint: '🛹' }, { word: 'WHEELBARROW', hint: '🛒' }, { word: 'SAILBOAT', hint: '⛵' },
            { word: 'ROWBOAT', hint: '🚣' }, { word: 'TROLLEY', hint: '🚋' }, { word: 'CARGO', hint: '🚢' }
        ],
        4: [
            { word: 'BICYCLE', hint: '🚲' }, { word: 'MOTORCYCLE', hint: '🏍️' }, { word: 'SUBMARINE', hint: '🚢' },
            { word: 'HELICOPTER', hint: '🚁' }, { word: 'AMBULANCE', hint: '🚑' }, { word: 'TRACTOR', hint: '🚜' },
            { word: 'CAMPERVAN', hint: '🚐' }, { word: 'FIRETRUCK', hint: '🚒' }, { word: 'POLICECAR', hint: '🚓' },
            { word: 'TAXICAB', hint: '🚕' }, { word: 'JETPLANE', hint: '✈️' }, { word: 'CARGOPLANE', hint: '✈️' },
            { word: 'SAILBOAT', hint: '⛵' }, { word: 'ROWBOAT', hint: '🚣' }, { word: 'TROLLEY', hint: '🚋' }
        ],
        5: [
            { word: 'HELICOPTER', hint: '🚁' }, { word: 'SUBMARINE', hint: '🚢' }, { word: 'AMBULANCE', hint: '🚑' },
            { word: 'MOTORCYCLE', hint: '🏍️' }, { word: 'SKATEBOARD', hint: '🛹' }, { word: 'WHEELBARROW', hint: '🛒' },
            { word: 'TRACTOR', hint: '🚜' }, { word: 'FIRETRUCK', hint: '🚒' }, { word: 'POLICECAR', hint: '🚓' },
            { word: 'CAMPERVAN', hint: '🚐' }, { word: 'JETPLANE', hint: '✈️' }, { word: 'SPACECRAFT', hint: '🚀' },
            { word: 'AIRCRAFT', hint: '✈️' }, { word: 'VESSEL', hint: '🚢' }, { word: 'VEHICLE', hint: '🚗' }
        ]
    },
    bodyParts: {
        1: [
            { word: 'EYE', hint: '👁️' }, { word: 'EAR', hint: '👂' }, { word: 'LIP', hint: '👄' },
            { word: 'RIB', hint: '🦴' }, { word: 'GUM', hint: '🦷' }, { word: 'TOE', hint: '🦶' },
            { word: 'ARM', hint: '💪' }, { word: 'LEG', hint: '🦵' }, { word: 'HIP', hint: '🦴' },
            { word: 'JAW', hint: '🦷' }, { word: 'PALM', hint: '🤚' }, { word: 'SHIN', hint: '🦵' },
            { word: 'CHEEK', hint: '😊' }, { word: 'NECK', hint: '🦒' }, { word: 'BACK', hint: '🔙' }
        ],
        2: [
            { word: 'HAND', hint: '🤚' }, { word: 'FOOT', hint: '🦶' }, { word: 'NOSE', hint: '👃' },
            { word: 'HEAD', hint: '🗣️' }, { word: 'HAIR', hint: '💇' }, { word: 'SKIN', hint: '🧴' },
            { word: 'BONE', hint: '🦴' }, { word: 'BRAIN', hint: '🧠' }, { word: 'HEART', hint: '❤️' },
            { word: 'LUNG', hint: '🫁' }, { word: 'LIVER', hint: '🫀' }, { word: 'BLOOD', hint: '🩸' },
            { word: 'THUMB', hint: '👍' }, { word: 'ELBOW', hint: '💪' }, { word: 'KNEE', hint: '🦵' }
        ],
        3: [
            { word: 'TONGUE', hint: '👅' }, { word: 'FINGER', hint: '👆' }, { word: 'TOOTH', hint: '🦷' },
            { word: 'CHEST', hint: '🫁' }, { word: 'WRIST', hint: '🤚' }, { word: 'ANKLE', hint: '🦶' },
            { word: 'THIGH', hint: '🦵' }, { word: 'SHOULDER', hint: '💪' }, { word: 'STOMACH', hint: '🤢' },
            { word: 'BRAIN', hint: '🧠' }, { word: 'HEART', hint: '❤️' }, { word: 'LIVER', hint: '🫀' },
            { word: 'KIDNEY', hint: '🫀' }, { word: 'MUSCLE', hint: '💪' }, { word: 'SKELETON', hint: '🦴' }
        ],
        4: [
            { word: 'FINGERS', hint: '👆' }, { word: 'TEETH', hint: '🦷' }, { word: 'STOMACH', hint: '🤢' },
            { word: 'SHOULDER', hint: '💪' }, { word: 'ELBOWS', hint: '💪' }, { word: 'KNEES', hint: '🦵' },
            { word: 'THIGHS', hint: '🦵' }, { word: 'ANKLES', hint: '🦶' }, { word: 'WRISTS', hint: '🤚' },
            { word: 'CHEEKS', hint: '😊' }, { word: 'TONGUES', hint: '👅' }, { word: 'FINGERNAIL', hint: '💅' },
            { word: 'THUMBNAIL', hint: '👍' }, { word: 'EYEBROW', hint: '🤨' }, { word: 'EYELASH', hint: '👁️' }
        ],
        5: [
            { word: 'SHOULDERS', hint: '💪' }, { word: 'ELBOWS', hint: '💪' }, { word: 'KNEECAPS', hint: '🦵' },
            { word: 'FINGERNAILS', hint: '💅' }, { word: 'TOENAILS', hint: '🦶' }, { word: 'EYEBROWS', hint: '🤨' },
            { word: 'EYELASHES', hint: '👁️' }, { word: 'INTESTINES', hint: '🫁' }, { word: 'KIDNEYS', hint: '🫀' },
            { word: 'LUNGS', hint: '🫁' }, { word: 'MUSCLES', hint: '💪' }, { word: 'SKELETON', hint: '🦴' },
            { word: 'PANCREAS', hint: '🫀' }, { word: 'BLADDER', hint: '🫀' }, { word: 'SPLEEN', hint: '🫀' }
        ]
    },
    clothing: {
        1: [
            { word: 'HAT', hint: '🎩' }, { word: 'CAP', hint: '🧢' }, { word: 'TIE', hint: '👔' },
            { word: 'BAG', hint: '👜' }, { word: 'WIG', hint: '👱' }, { word: 'CUP', hint: '🥤' },
            { word: 'GUN', hint: '🔫' }, { word: 'JAR', hint: '🫙' }, { word: 'BOX', hint: '📦' },
            { word: 'KEY', hint: '🔑' }, { word: 'PEN', hint: '🖊️' }, { word: 'MAP', hint: '🗺️' },
            { word: 'GUN', hint: '🔫' }, { word: 'TOY', hint: '🧸' }, { word: 'CAN', hint: '🥫' }
        ],
        2: [
            { word: 'SHIRT', hint: '👕' }, { word: 'SKIRT', hint: '👗' }, { word: 'DRESS', hint: '👗' },
            { word: 'SHORTS', hint: '🩳' }, { word: 'SHOES', hint: '👟' }, { word: 'BOOTS', hint: '🥾' },
            { word: 'SOCKS', hint: '🧦' }, { word: 'GLOVES', hint: '🧤' }, { word: 'SCARF', hint: '🧣' },
            { word: 'BELT', hint: '🪢' }, { word: 'COAT', hint: '🧥' }, { word: 'VEST', hint: '🦺' },
            { word: 'JEANS', hint: '👖' }, { word: 'SUIT', hint: '🤵' }, { word: 'ROBE', hint: '👘' }
        ],
        3: [
            { word: 'SHIRT', hint: '👕' }, { word: 'SKIRT', hint: '👗' }, { word: 'DRESS', hint: '👗' },
            { word: 'SHOES', hint: '👟' }, { word: 'BOOTS', hint: '🥾' }, { word: 'SOCKS', hint: '🧦' },
            { word: 'GLOVES', hint: '🧤' }, { word: 'SCARF', hint: '🧣' }, { word: 'BELT', hint: '🪢' },
            { word: 'COAT', hint: '🧥' }, { word: 'VEST', hint: '🦺' }, { word: 'JEANS', hint: '👖' },
            { word: 'SUIT', hint: '🤵' }, { word: 'ROBE', hint: '👘' }, { word: 'SHORTS', hint: '🩳' }
        ],
        4: [
            { word: 'JACKET', hint: '🧥' }, { word: 'SWEATER', hint: '🧶' }, { word: 'BLAZER', hint: '🧥' },
            { word: 'PAJAMAS', hint: '🛏️' }, { word: 'SWEATER', hint: '🧶' }, { word: 'TUXEDO', hint: '🤵' },
            { word: 'PONCHO', hint: '🧥' }, { word: 'SANDALS', hint: '🩴' }, { word: 'SLIPPERS', hint: '🩴' },
            { word: 'SNEAKERS', hint: '👟' }, { word: 'MITTENS', hint: '🧤' }, { word: 'OVERALLS', hint: '👖' },
            { word: 'LEGGINGS', hint: '👖' }, { word: 'CARDIGAN', hint: '🧶' }, { word: 'SWEATERS', hint: '🧶' }
        ],
        5: [
            { word: 'SWEATER', hint: '🧶' }, { word: 'JACKET', hint: '🧥' }, { word: 'BLAZER', hint: '🧥' },
            { word: 'TUXEDO', hint: '🤵' }, { word: 'PAJAMAS', hint: '🛏️' }, { word: 'SANDALS', hint: '🩴' },
            { word: 'SLIPPERS', hint: '🩴' }, { word: 'SNEAKERS', hint: '👟' }, { word: 'MITTENS', hint: '🧤' },
            { word: 'OVERALLS', hint: '👖' }, { word: 'LEGGINGS', hint: '👖' }, { word: 'CARDIGAN', hint: '🧶' },
            { word: 'RAINCOAT', hint: '🧥' }, { word: 'SWEATSHIRT', hint: '🧶' }, { word: 'TRACKSUIT', hint: '👕' }
        ]
    },
    weather: {
        1: [
            { word: 'SUN', hint: '☀️' }, { word: 'ICE', hint: '🧊' }, { word: 'FOG', hint: '🌫️' },
            { word: 'DEW', hint: '💧' }, { word: 'MIST', hint: '🌫️' }, { word: 'SLEET', hint: '🌨️' },
            { word: 'HAIL', hint: '🌨️' }, { word: 'RAIN', hint: '🌧️' }, { word: 'WIND', hint: '💨' },
            { word: 'SNOW', hint: '❄️' }, { word: 'HEAT', hint: '🔥' }, { word: 'COLD', hint: '🥶' },
            { word: 'WARM', hint: '🌡️' }, { word: 'COOL', hint: '🌬️' }, { word: 'DRY', hint: '🏜️' }
        ],
        2: [
            { word: 'RAIN', hint: '🌧️' }, { word: 'SNOW', hint: '❄️' }, { word: 'WIND', hint: '💨' },
            { word: 'HEAT', hint: '🔥' }, { word: 'COLD', hint: '🥶' }, { word: 'WARM', hint: '🌡️' },
            { word: 'COOL', hint: '🌬️' }, { word: 'DRY', hint: '🏜️' }, { word: 'WET', hint: '💧' },
            { word: 'STORM', hint: '⛈️' }, { word: 'CLOUD', hint: '☁️' }, { word: 'FROST', hint: '🥶' },
            { word: 'HUMID', hint: '💧' }, { word: 'DROUGHT', hint: '🏜️' }, { word: 'THAW', hint: '🌡️' }
        ],
        3: [
            { word: 'CLOUD', hint: '☁️' }, { word: 'STORM', hint: '⛈️' }, { word: 'FROST', hint: '🥶' },
            { word: 'HUMID', hint: '💧' }, { word: 'BREEZE', hint: '🌬️' }, { word: 'SUNNY', hint: '☀️' },
            { word: 'RAINY', hint: '🌧️' }, { word: 'WINDY', hint: '💨' }, { word: 'SNOWY', hint: '❄️' },
            { word: 'FOGGY', hint: '🌫️' }, { word: 'ICY', hint: '🧊' }, { word: 'CLOUDY', hint: '☁️' },
            { word: 'STORMY', hint: '⛈️' }, { word: 'CLEAR', hint: '☀️' }, { word: 'MILD', hint: '🌡️' }
        ],
        4: [
            { word: 'THUNDER', hint: '⚡' }, { word: 'LIGHTNING', hint: '⚡' }, { word: 'TORNADO', hint: '🌪️' },
            { word: 'HURRICANE', hint: '🌀' }, { word: 'BLIZZARD', hint: '❄️' }, { word: 'MONSOON', hint: '🌧️' },
            { word: 'SHOWER', hint: '🌧️' }, { word: 'DRIZZLE', hint: '🌦️' }, { word: 'SUNSHINE', hint: '☀️' },
            { word: 'RAINBOW', hint: '🌈' }, { word: 'CLIMATE', hint: '🌡️' }, { word: 'SEASON', hint: '📅' },
            { word: 'AUTUMN', hint: '🍂' }, { word: 'SPRING', hint: '🌸' }, { word: 'SUMMER', hint: '☀️' }
        ],
        5: [
            { word: 'LIGHTNING', hint: '⚡' }, { word: 'THUNDER', hint: '⚡' }, { word: 'TORNADO', hint: '🌪️' },
            { word: 'HURRICANE', hint: '🌀' }, { word: 'BLIZZARD', hint: '❄️' }, { word: 'MONSOON', hint: '🌧️' },
            { word: 'SHOWER', hint: '🌧️' }, { word: 'DRIZZLE', hint: '🌦️' }, { word: 'SUNSHINE', hint: '☀️' },
            { word: 'RAINBOW', hint: '🌈' }, { word: 'CLIMATE', hint: '🌡️' }, { word: 'SEASON', hint: '📅' },
            { word: 'AUTUMN', hint: '🍂' }, { word: 'SPRING', hint: '🌸' }, { word: 'SUMMER', hint: '☀️' }
        ]
    },
    food: {
        1: [
            { word: 'EGG', hint: '🥚' }, { word: 'RICE', hint: '🍚' }, { word: 'SOUP', hint: '🍲' },
            { word: 'PIE', hint: '🥧' }, { word: 'TART', hint: '🥧' }, { word: 'BUN', hint: '🍞' },
            { word: 'JAM', hint: '🍯' }, { word: 'JELLY', hint: '🍮' }, { word: 'TACO', hint: '🌮' },
            { word: 'SUSHI', hint: '🍣' }, { word: 'STEAK', hint: '🥩' }, { word: 'BREAD', hint: '🍞' },
            { word: 'PASTA', hint: '🍝' }, { word: 'SALAD', hint: '🥗' }, { word: 'CURRY', hint: '🍛' }
        ],
        2: [
            { word: 'BREAD', hint: '🍞' }, { word: 'PASTA', hint: '🍝' }, { word: 'SALAD', hint: '🥗' },
            { word: 'CURRY', hint: '🍛' }, { word: 'STEAK', hint: '🥩' }, { word: 'SUSHI', hint: '🍣' },
            { word: 'TACO', hint: '🌮' }, { word: 'PIZZA', hint: '🍕' }, { word: 'BURGER', hint: '🍔' },
            { word: 'CHEESE', hint: '🧀' }, { word: 'BUTTER', hint: '🧈' }, { word: 'CREAM', hint: '🥛' },
            { word: 'YOGURT', hint: '🥛' }, { word: 'HONEY', hint: '🍯' }, { word: 'SUGAR', hint: '🍬' }
        ],
        3: [
            { word: 'CHEESE', hint: '🧀' }, { word: 'BUTTER', hint: '🧈' }, { word: 'CREAM', hint: '🥛' },
            { word: 'YOGURT', hint: '🥛' }, { word: 'HONEY', hint: '🍯' }, { word: 'SUGAR', hint: '🍬' },
            { word: 'SALT', hint: '🧂' }, { word: 'PEPPER', hint: '🌶️' }, { word: 'SPICE', hint: '🌶️' },
            { word: 'SAUCE', hint: '🍲' }, { word: 'GRAVY', hint: '🍲' }, { word: 'STEW', hint: '🍲' },
            { word: 'BROTH', hint: '🍲' }, { word: 'NOODLE', hint: '🍜' }, { word: 'DUMPLING', hint: '🥟' }
        ],
        4: [
            { word: 'CHICKEN', hint: '🍗' }, { word: 'TURKEY', hint: '🦃' }, { word: 'BURGER', hint: '🍔' },
            { word: 'PIZZA', hint: '🍕' }, { word: 'SANDWICH', hint: '🥪' }, { word: 'PANCAKE', hint: '🥞' },
            { word: 'WAFFLE', hint: '🧇' }, { word: 'DONUT', hint: '🍩' }, { word: 'COOKIE', hint: '🍪' },
            { word: 'MUFFIN', hint: '🧁' }, { word: 'BAGEL', hint: '🥯' }, { word: 'PRETZEL', hint: '🥨' },
            { word: 'POPCORN', hint: '🍿' }, { word: 'CHOCOLATE', hint: '🍫' }, { word: 'ICECREAM', hint: '🍦' }
        ],
        5: [
            { word: 'CHOCOLATE', hint: '🍫' }, { word: 'ICECREAM', hint: '🍦' }, { word: 'SANDWICH', hint: '🥪' },
            { word: 'PANCAKES', hint: '🥞' }, { word: 'WAFFLES', hint: '🧇' }, { word: 'DONUTS', hint: '🍩' },
            { word: 'COOKIES', hint: '🍪' }, { word: 'MUFFINS', hint: '🧁' }, { word: 'BAGELS', hint: '🥯' },
            { word: 'PRETZELS', hint: '🥨' }, { word: 'POPCORNS', hint: '🍿' }, { word: 'DUMPLINGS', hint: '🥟' },
            { word: 'NOODLES', hint: '🍜' }, { word: 'SPAGHETTI', hint: '🍝' }, { word: 'MACARONI', hint: '🍝' }
        ]
    },
    countries: {
        1: [
            { word: 'USA', hint: '🇺🇸' }, { word: 'UK', hint: '🇬🇧' }, { word: 'UAE', hint: '🇦🇪' },
            { word: 'PERU', hint: '🇵🇪' }, { word: 'CUBA', hint: '🇨🇺' }, { word: 'FIJI', hint: '🇫🇯' },
            { word: 'IRAN', hint: '🇮🇷' }, { word: 'IRAQ', hint: '🇮🇶' }, { word: 'OMAN', hint: '🇴🇲' },
            { word: 'YEMEN', hint: '🇾🇪' }, { word: 'CHAD', hint: '🇹🇩' }, { word: 'MALI', hint: '🇲🇱' },
            { word: 'TOGO', hint: '🇹🇬' }, { word: 'LAOS', hint: '🇱🇦' }, { word: 'INDIA', hint: '🇮🇳' }
        ],
        2: [
            { word: 'INDIA', hint: '🇮🇳' }, { word: 'CHINA', hint: '🇨🇳' }, { word: 'JAPAN', hint: '🇯🇵' },
            { word: 'SPAIN', hint: '🇪🇸' }, { word: 'ITALY', hint: '🇮🇹' }, { word: 'FRANCE', hint: '🇫🇷' },
            { word: 'BRAZIL', hint: '🇧🇷' }, { word: 'CANADA', hint: '🇨🇦' }, { word: 'MEXICO', hint: '🇲🇽' },
            { word: 'EGYPT', hint: '🇪🇬' }, { word: 'KENYA', hint: '🇰🇪' }, { word: 'GHANA', hint: '🇬🇭' },
            { word: 'NEPAL', hint: '🇳🇵' }, { word: 'QATAR', hint: '🇶🇦' }, { word: 'RUSSIA', hint: '🇷🇺' }
        ],
        3: [
            { word: 'FRANCE', hint: '🇫🇷' }, { word: 'BRAZIL', hint: '🇧🇷' }, { word: 'CANADA', hint: '🇨🇦' },
            { word: 'MEXICO', hint: '🇲🇽' }, { word: 'EGYPT', hint: '🇪🇬' }, { word: 'KENYA', hint: '🇰🇪' },
            { word: 'GHANA', hint: '🇬🇭' }, { word: 'NEPAL', hint: '🇳🇵' }, { word: 'QATAR', hint: '🇶🇦' },
            { word: 'RUSSIA', hint: '🇷🇺' }, { word: 'SWEDEN', hint: '🇸🇪' }, { word: 'NORWAY', hint: '🇳🇴' },
            { word: 'POLAND', hint: '🇵🇱' }, { word: 'GREECE', hint: '🇬🇷' }, { word: 'TURKEY', hint: '🇹🇷' }
        ],
        4: [
            { word: 'GERMANY', hint: '🇩🇪' }, { word: 'ENGLAND', hint: '🏴' }, { word: 'SCOTLAND', hint: '🏴' },
            { word: 'ICELAND', hint: '🇮🇸' }, { word: 'IRELAND', hint: '🇮🇪' }, { word: 'PORTUGAL', hint: '🇵🇹' },
            { word: 'BELGIUM', hint: '🇧🇪' }, { word: 'AUSTRIA', hint: '🇦🇹' }, { word: 'FINLAND', hint: '🇫🇮' },
            { word: 'DENMARK', hint: '🇩🇰' }, { word: 'HOLLAND', hint: '🇳🇱' }, { word: 'JORDAN', hint: '🇯🇴' },
            { word: 'KUWAIT', hint: '🇰🇼' }, { word: 'BAHRAIN', hint: '🇧🇭' }, { word: 'ANGOLA', hint: '🇦🇴' }
        ],
        5: [
            { word: 'AUSTRALIA', hint: '🇦🇺' }, { word: 'ARGENTINA', hint: '🇦🇷' }, { word: 'COLOMBIA', hint: '🇨🇴' },
            { word: 'VENEZUELA', hint: '🇻🇪' }, { word: 'INDONESIA', hint: '🇮🇩' }, { word: 'PHILIPPINES', hint: '🇵🇭' },
            { word: 'THAILAND', hint: '🇹🇭' }, { word: 'MALAYSIA', hint: '🇲🇾' }, { word: 'SINGAPORE', hint: '🇸🇬' },
            { word: 'PAKISTAN', hint: '🇵🇰' }, { word: 'BANGLADESH', hint: '🇧🇩' }, { word: 'AFGHANISTAN', hint: '🇦🇫' },
            { word: 'CAMEROON', hint: '🇨🇲' }, { word: 'ETHIOPIA', hint: '🇪🇹' }, { word: 'MOROCCO', hint: '🇲🇦' }
        ]
    },
    shapes: {
        1: [
            { word: 'DOT', hint: '⚫' }, { word: 'LINE', hint: '➖' }, { word: 'ARC', hint: '⌒' },
            { word: 'OVAL', hint: '🟡' }, { word: 'RING', hint: '💍' }, { word: 'CONE', hint: '🔺' },
            { word: 'CUBE', hint: '🟦' }, { word: 'BOX', hint: '📦' }, { word: 'STAR', hint: '⭐' },
            { word: 'CROSS', hint: '✖️' }, { word: 'X', hint: '❌' }, { word: 'V', hint: '🔻' },
            { word: 'L', hint: '📐' }, { word: 'T', hint: '🔨' }, { word: 'Z', hint: '🔤' }
        ],
        2: [
            { word: 'SQUARE', hint: '🟦' }, { word: 'CIRCLE', hint: '⭕' }, { word: 'TRIANGLE', hint: '🔺' },
            { word: 'RECTANGLE', hint: '📐' }, { word: 'DIAMOND', hint: '💎' }, { word: 'OVAL', hint: '🟡' },
            { word: 'CUBE', hint: '🟦' }, { word: 'CONE', hint: '🔺' }, { word: 'STAR', hint: '⭐' },
            { word: 'CROSS', hint: '✖️' }, { word: 'HEART', hint: '❤️' }, { word: 'SPIRAL', hint: '🌀' },
            { word: 'RING', hint: '💍' }, { word: 'BOX', hint: '📦' }, { word: 'PYRAMID', hint: '🔺' }
        ],
        3: [
            { word: 'SQUARE', hint: '🟦' }, { word: 'CIRCLE', hint: '⭕' }, { word: 'TRIANGLE', hint: '🔺' },
            { word: 'RECTANGLE', hint: '📐' }, { word: 'DIAMOND', hint: '💎' }, { word: 'OVAL', hint: '🟡' },
            { word: 'CUBE', hint: '🟦' }, { word: 'CONE', hint: '🔺' }, { word: 'STAR', hint: '⭐' },
            { word: 'CROSS', hint: '✖️' }, { word: 'HEART', hint: '❤️' }, { word: 'SPIRAL', hint: '🌀' },
            { word: 'RING', hint: '💍' }, { word: 'BOX', hint: '📦' }, { word: 'PYRAMID', hint: '🔺' }
        ],
        4: [
            { word: 'TRIANGLE', hint: '🔺' }, { word: 'RECTANGLE', hint: '📐' }, { word: 'DIAMOND', hint: '💎' },
            { word: 'OVAL', hint: '🟡' }, { word: 'CUBE', hint: '🟦' }, { word: 'CONE', hint: '🔺' },
            { word: 'STAR', hint: '⭐' }, { word: 'CROSS', hint: '✖️' }, { word: 'HEART', hint: '❤️' },
            { word: 'SPIRAL', hint: '🌀' }, { word: 'RING', hint: '💍' }, { word: 'BOX', hint: '📦' },
            { word: 'PYRAMID', hint: '🔺' }, { word: 'CYLINDER', hint: '🔵' }, { word: 'SPHERE', hint: '🔵' }
        ],
        5: [
            { word: 'TRIANGLE', hint: '🔺' }, { word: 'RECTANGLE', hint: '📐' }, { word: 'DIAMOND', hint: '💎' },
            { word: 'OVAL', hint: '🟡' }, { word: 'CUBE', hint: '🟦' }, { word: 'CONE', hint: '🔺' },
            { word: 'STAR', hint: '⭐' }, { word: 'CROSS', hint: '✖️' }, { word: 'HEART', hint: '❤️' },
            { word: 'SPIRAL', hint: '🌀' }, { word: 'RING', hint: '💍' }, { word: 'BOX', hint: '📦' },
            { word: 'PYRAMID', hint: '🔺' }, { word: 'CYLINDER', hint: '🔵' }, { word: 'SPHERE', hint: '🔵' }
        ]
    },
    toys: {
        1: [
            { word: 'TOP', hint: '🌀' }, { word: 'BALL', hint: '⚽' }, { word: 'DOLL', hint: '🪆' },
            { word: 'KITE', hint: '🪁' }, { word: 'YOYO', hint: '🪀' }, { word: 'BLOCK', hint: '🧱' },
            { word: 'TRAIN', hint: '🚂' }, { word: 'CAR', hint: '🚗' }, { word: 'BOAT', hint: '🚤' },
            { word: 'PLANE', hint: '✈️' }, { word: 'ROBOT', hint: '🤖' }, { word: 'TEDDY', hint: '🧸' },
            { word: 'PUZZLE', hint: '🧩' }, { word: 'GAME', hint: '🎮' }, { word: 'TOY', hint: '🧸' }
        ],
        2: [
            { word: 'DOLL', hint: '🪆' }, { word: 'KITE', hint: '🪁' }, { word: 'YOYO', hint: '🪀' },
            { word: 'BLOCK', hint: '🧱' }, { word: 'TRAIN', hint: '🚂' }, { word: 'CAR', hint: '🚗' },
            { word: 'BOAT', hint: '🚤' }, { word: 'PLANE', hint: '✈️' }, { word: 'ROBOT', hint: '🤖' },
            { word: 'TEDDY', hint: '🧸' }, { word: 'PUZZLE', hint: '🧩' }, { word: 'GAME', hint: '🎮' },
            { word: 'TOY', hint: '🧸' }, { word: 'BALL', hint: '⚽' }, { word: 'TOP', hint: '🌀' }
        ],
        3: [
            { word: 'DOLL', hint: '🪆' }, { word: 'KITE', hint: '🪁' }, { word: 'YOYO', hint: '🪀' },
            { word: 'BLOCK', hint: '🧱' }, { word: 'TRAIN', hint: '🚂' }, { word: 'CAR', hint: '🚗' },
            { word: 'BOAT', hint: '🚤' }, { word: 'PLANE', hint: '✈️' }, { word: 'ROBOT', hint: '🤖' },
            { word: 'TEDDY', hint: '🧸' }, { word: 'PUZZLE', hint: '🧩' }, { word: 'GAME', hint: '🎮' },
            { word: 'TOY', hint: '🧸' }, { word: 'BALL', hint: '⚽' }, { word: 'TOP', hint: '🌀' }
        ],
        4: [
            { word: 'DOLLHOUSE', hint: '🏠' }, { word: 'ROBOT', hint: '🤖' }, { word: 'PUZZLE', hint: '🧩' },
            { word: 'GAME', hint: '🎮' }, { word: 'TOY', hint: '🧸' }, { word: 'BALL', hint: '⚽' },
            { word: 'TOP', hint: '🌀' }, { word: 'DOLL', hint: '🪆' }, { word: 'KITE', hint: '🪁' },
            { word: 'YOYO', hint: '🪀' }, { word: 'BLOCK', hint: '🧱' }, { word: 'TRAIN', hint: '🚂' },
            { word: 'CAR', hint: '🚗' }, { word: 'BOAT', hint: '🚤' }, { word: 'PLANE', hint: '✈️' }
        ],
        5: [
            { word: 'DOLLHOUSE', hint: '🏠' }, { word: 'ROBOT', hint: '🤖' }, { word: 'PUZZLE', hint: '🧩' },
            { word: 'GAME', hint: '🎮' }, { word: 'TOY', hint: '🧸' }, { word: 'BALL', hint: '⚽' },
            { word: 'TOP', hint: '🌀' }, { word: 'DOLL', hint: '🪆' }, { word: 'KITE', hint: '🪁' },
            { word: 'YOYO', hint: '🪀' }, { word: 'BLOCK', hint: '🧱' }, { word: 'TRAIN', hint: '🚂' },
            { word: 'CAR', hint: '🚗' }, { word: 'BOAT', hint: '🚤' }, { word: 'PLANE', hint: '✈️' }
        ]
    }
};

// Game State
const gameState = {
    currentCategory: 'general',
    currentLevel: 1,
    currentWordIndex: 0,
    currentWord: null,
    score: 0,
    streak: 0,
    bestStreak: 0,
    hintsUsed: 0,
    wordsCompleted: 0,
    levelWordsCompleted: 0,
    attempts: 0,
    maxAttempts: 0,
    soundEnabled: true,
    gameStarted: false,
    shuffledWords: [],
    selectedTile: null
};

// DOM Elements
const elements = {
    score: document.getElementById('score'),
    streak: document.getElementById('streak'),
    streakContainer: document.getElementById('streak-container'),
    level: document.getElementById('level'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    hintEmoji: document.getElementById('hint-emoji'),
    hintText: document.getElementById('hint-text'),
    wordSlots: document.getElementById('word-slots'),
    letterBank: document.getElementById('letter-bank'),
    feedback: document.getElementById('feedback'),
    hintBtn: document.getElementById('hint-btn'),
    skipBtn: document.getElementById('skip-btn'),
    resetBtn: document.getElementById('reset-btn'),
    startModal: document.getElementById('start-modal'),
    startBtn: document.getElementById('start-btn'),
    levelModal: document.getElementById('level-modal'),
    nextLevelBtn: document.getElementById('next-level-btn'),
    gameCompleteModal: document.getElementById('game-complete-modal'),
    playAgainBtn: document.getElementById('play-again-btn'),
    modalScore: document.getElementById('modal-score'),
    modalLevel: document.getElementById('modal-level'),
    starsDisplay: document.getElementById('stars-display'),
    finalScore: document.getElementById('final-score'),
    bestStreak: document.getElementById('best-streak'),
    wordsLearned: document.getElementById('words-learned'),
    soundToggle: document.getElementById('sound-toggle'),
    soundIcon: document.getElementById('sound-icon'),
    confettiContainer: document.getElementById('confetti-container'),
    categoryModal: document.getElementById('category-modal'),
    categoryBackBtn: document.getElementById('category-back-btn')
};

// Audio Context for sound effects
let audioContext;

// Initialize Audio Context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Play sound effect
function playSound(type) {
    if (!gameState.soundEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'success':
            oscillator.frequency.value = 523;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.1;
            oscillator.start();
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                osc2.connect(gainNode);
                osc2.frequency.value = 659;
                osc2.start();
                osc2.stop(audioContext.currentTime + 0.15);
            }, 100);
            setTimeout(() => {
                const osc3 = audioContext.createOscillator();
                osc3.connect(gainNode);
                osc3.frequency.value = 784;
                osc3.start();
                osc3.stop(audioContext.currentTime + 0.2);
            }, 200);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'error':
            oscillator.frequency.value = 200;
            oscillator.type = 'square';
            gainNode.gain.value = 0.05;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'hint':
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.08;
            oscillator.start();
            setTimeout(() => oscillator.frequency.value = 800, 100);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
    }
}

// Create confetti
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#6366f1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        elements.confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3500);
    }
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize game
function initGame() {
    initAudio();
    
    // Load saved state if exists
    loadGameState();
    
    // Event listeners
    elements.startBtn.addEventListener('click', startGame);
    elements.nextLevelBtn.addEventListener('click', nextLevel);
    elements.playAgainBtn.addEventListener('click', resetGame);
    elements.hintBtn.addEventListener('click', showHint);
    elements.skipBtn.addEventListener('click', skipWord);
    elements.resetBtn.addEventListener('click', resetWord);
    elements.soundToggle.addEventListener('click', toggleSound);
    elements.categoryBackBtn.addEventListener('click', backToStart);
}

// Go back from category selection to start screen
function backToStart() {
    playSound('click');
    elements.categoryModal.classList.remove('show');
    elements.startModal.classList.add('show');
}

// Start game - show category selection
function startGame() {
    playSound('click');
    gameState.gameStarted = true;
    elements.startModal.classList.remove('show');
    showCategorySelection();
}

// Show category selection screen
function showCategorySelection() {
    const categoryScreen = document.getElementById('category-modal');
    categoryScreen.classList.add('show');
    renderCategoryGrid();
}

// Render category grid
function renderCategoryGrid() {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    
    Object.keys(categories).forEach(key => {
        const cat = categories[key];
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.borderColor = cat.color;
        card.innerHTML = `
            <span class="category-icon">${cat.icon}</span>
            <span class="category-name">${cat.name}</span>
        `;
        card.addEventListener('click', () => selectCategory(key));
        grid.appendChild(card);
    });
}

// Select category and start playing
function selectCategory(category) {
    playSound('click');
    gameState.currentCategory = category;
    gameState.currentLevel = 1;
    gameState.levelWordsCompleted = 0;
    
    const categoryScreen = document.getElementById('category-modal');
    categoryScreen.classList.remove('show');
    
    prepareLevel();
}

// Prepare level
function prepareLevel() {
    const catWords = wordDatabase[gameState.currentCategory][gameState.currentLevel];
    gameState.shuffledWords = shuffleArray([...catWords]);
    gameState.currentWordIndex = 0;
    gameState.levelWordsCompleted = 0;
    gameState.maxAttempts = catWords.length;
    gameState.selectedTile = null;
    
    updateUI();
    loadWord();
}

// Load current word
function loadWord() {
    const wordData = gameState.shuffledWords[gameState.currentWordIndex];
    gameState.currentWord = wordData.word;
    gameState.hintsUsed = 0;
    gameState.attempts = 0;
    gameState.selectedTile = null;
    
    const cat = categories[gameState.currentCategory];
    
    // Update display
    elements.hintEmoji.textContent = wordData.hint;
    elements.hintText.textContent = `${cat.icon} ${cat.name} - Level ${gameState.currentLevel}/5`;
    elements.feedback.textContent = '';
    elements.feedback.className = 'feedback';
    elements.hintBtn.disabled = false;
    
    // Create word slots
    createWordSlots();
    
    // Create letter bank
    createLetterBank();
    
    // Update progress
    updateProgress();
}

// Create word slots
function createWordSlots() {
    elements.wordSlots.innerHTML = '';
    
    for (let i = 0; i < gameState.currentWord.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'word-slot';
        slot.dataset.index = i;
        slot.dataset.letter = gameState.currentWord[i];
        
        // Click to place selected letter
        slot.addEventListener('click', () => handleSlotClick(slot));
        
        elements.wordSlots.appendChild(slot);
    }
}

// Handle slot click - place selected letter
function handleSlotClick(slot) {
    // If slot is already filled, do nothing (locked)
    if (slot.classList.contains('filled')) return;
    
    // If a tile is selected, try to place it
    if (gameState.selectedTile) {
        const letter = gameState.selectedTile;
        const slotLetter = slot.dataset.letter;
        
        if (letter === slotLetter) {
            // Correct letter - place it
            placeLetter(slot, letter);
        } else {
            // Wrong letter
            playSound('error');
            slot.classList.add('incorrect');
            setTimeout(() => slot.classList.remove('incorrect'), 500);
            gameState.attempts++;
            resetStreak();
            elements.feedback.textContent = 'Try again!';
            elements.feedback.className = 'feedback error';
        }
    }
}

// Create letter bank
function createLetterBank() {
    elements.letterBank.innerHTML = '';
    
    // Get word letters plus extra random letters
    const wordLetters = gameState.currentWord.split('');
    const extraLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        .filter(l => !wordLetters.includes(l))
        .slice(0, 3);
    
    const allLetters = shuffleArray([...wordLetters, ...extraLetters]);
    
    allLetters.forEach((letter, index) => {
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        tile.dataset.letter = letter;
        
        // Click to select/deselect
        tile.addEventListener('click', () => handleTileClick(tile));
        
        elements.letterBank.appendChild(tile);
    });
}

// Handle tile click - select/deselect
function handleTileClick(tile) {
    // If tile is already used, do nothing
    if (tile.classList.contains('used')) return;
    
    playSound('click');
    const letter = tile.dataset.letter;
    
    // Toggle selection
    if (gameState.selectedTile === letter) {
        // Deselect
        gameState.selectedTile = null;
    } else {
        // Select new tile
        gameState.selectedTile = letter;
    }
    
    updateTileSelection();
}

// Update visual selection state
function updateTileSelection() {
    const tiles = document.querySelectorAll('.letter-tile');
    tiles.forEach(tile => {
        tile.classList.remove('selected');
        if (tile.dataset.letter === gameState.selectedTile) {
            tile.classList.add('selected');
        }
    });
}

// Place letter in slot
function placeLetter(slot, letter) {
    playSound('click');
    
    // Mark the tile as used
    const tile = document.querySelector(`.letter-tile[data-letter="${letter}"]`);
    if (tile) {
        tile.classList.add('used');
    }
    
    slot.textContent = letter;
    slot.classList.add('filled');
    
    // Clear selection
    gameState.selectedTile = null;
    updateTileSelection();
    
    // Check if word is complete
    checkWord();
}

// Check if word is complete and correct
function checkWord() {
    const slots = document.querySelectorAll('.word-slot');
    let word = '';
    
    slots.forEach(slot => {
        word += slot.textContent;
    });
    
    if (word.length === gameState.currentWord.length) {
        if (word === gameState.currentWord) {
            // Correct!
            handleCorrectWord();
        } else {
            // Wrong word
            playSound('error');
            elements.feedback.textContent = 'Not quite! Try again';
            elements.feedback.className = 'feedback error';
            gameState.attempts++;
            resetStreak();
            
            // Shake animation
            slots.forEach(slot => {
                if (slot.textContent !== gameState.currentWord[slot.dataset.index]) {
                    slot.classList.add('incorrect');
                    setTimeout(() => slot.classList.remove('incorrect'), 500);
                }
            });
        }
    }
}

// Handle correct word
function handleCorrectWord() {
    playSound('success');
    
    const slots = document.querySelectorAll('.word-slot');
    slots.forEach(slot => {
        slot.classList.add('correct');
    });
    
    // Calculate score
    let points = 100;
    if (gameState.hintsUsed === 0) points += 50; // Bonus for no hints
    if (gameState.attempts === 0) points += 100; // Bonus for first try
    points += gameState.streak * 25; // Streak bonus
    
    gameState.score += points;
    gameState.streak++;
    gameState.wordsCompleted++;
    gameState.levelWordsCompleted++;
    
    if (gameState.streak > gameState.bestStreak) {
        gameState.bestStreak = gameState.streak;
    }
    
    // Update streak display with animation
    if (gameState.streak >= 3) {
        elements.streakContainer.classList.add('hot');
    }
    
    elements.feedback.textContent = `+${points} points!`;
    elements.feedback.className = 'feedback success';
    elements.hintText.textContent = gameState.currentWord;
    
    createConfetti();
    
    updateUI();
    
    // Move to next word or level
    setTimeout(() => {
        gameState.currentWordIndex++;
        
        if (gameState.currentWordIndex >= gameState.shuffledWords.length) {
            // Level complete
            showLevelComplete();
        } else {
            loadWord();
        }
    }, 1500);
}

// Show level complete modal
function showLevelComplete() {
    const stars = calculateStars();
    const cat = categories[gameState.currentCategory];
    
    elements.modalScore.textContent = gameState.score;
    elements.modalLevel.textContent = `${cat.icon} ${cat.name} - Level ${gameState.currentLevel}/5`;
    
    // Show stars
    const starElements = elements.starsDisplay.querySelectorAll('.star');
    starElements.forEach((star, i) => {
        star.classList.remove('earned');
        if (i < stars) {
            setTimeout(() => star.classList.add('earned'), 300 * (i + 1));
        }
    });
    
    if (gameState.currentLevel >= 5) {
        // Category complete
        showCategoryComplete();
    } else {
        elements.nextLevelBtn.textContent = `Next Level →`;
        elements.levelModal.classList.add('show');
    }
}

// Show category complete modal
function showCategoryComplete() {
    const cat = categories[gameState.currentCategory];
    elements.finalScore.textContent = gameState.score;
    elements.bestStreak.textContent = gameState.bestStreak;
    elements.wordsLearned.textContent = gameState.wordsCompleted;
    document.getElementById('modal-subtitle').textContent = `You've mastered ${cat.name}!`;
    elements.gameCompleteModal.classList.add('show');
    createConfetti();
}

// Calculate stars based on performance
function calculateStars() {
    const totalAttempts = gameState.attempts;
    const levelSize = wordDatabase[gameState.currentCategory][gameState.currentLevel].length;
    
    if (totalAttempts === 0) return 3;
    if (totalAttempts <= levelSize) return 2;
    return 1;
}

// Show game complete modal
function showGameComplete() {
    elements.finalScore.textContent = gameState.score;
    elements.bestStreak.textContent = gameState.bestStreak;
    elements.wordsLearned.textContent = gameState.wordsCompleted;
    document.getElementById('modal-subtitle').textContent = "You've mastered all categories!";
    elements.gameCompleteModal.classList.add('show');
    createConfetti();
}

// Next level
function nextLevel() {
    playSound('click');
    elements.levelModal.classList.remove('show');
    elements.streakContainer.classList.remove('hot');
    
    gameState.currentLevel++;
    if (gameState.currentLevel > 5) {
        // All levels complete, go back to category selection
        showCategorySelection();
    } else {
        prepareLevel();
    }
}

// Skip word
function skipWord() {
    playSound('click');
    resetStreak();
    gameState.currentWordIndex++;
    gameState.currentWordIndex %= gameState.shuffledWords.length;
    loadWord();
}

// Reset current word
function resetWord() {
    playSound('click');
    
    // Reset hints
    gameState.hintsUsed = 0;
    gameState.attempts++;
    elements.hintBtn.disabled = false;
    
    // Clear all slots
    document.querySelectorAll('.word-slot').forEach(slot => {
        slot.textContent = '';
        slot.classList.remove('filled', 'correct');
    });
    
    // Re-enable all tiles
    document.querySelectorAll('.letter-tile').forEach(tile => {
        tile.classList.remove('used');
    });
    
    // Clear selection
    gameState.selectedTile = null;
    updateTileSelection();
    
    elements.feedback.textContent = '';
    elements.feedback.className = 'feedback';
}

// Show hint
function showHint() {
    playSound('hint');
    gameState.hintsUsed++;
    
    // Find first empty or wrong slot
    const slots = document.querySelectorAll('.word-slot');
    for (const slot of slots) {
        if (!slot.classList.contains('filled') || slot.textContent !== slot.dataset.letter) {
            // Find the correct tile
            const correctLetter = slot.dataset.letter;
            
            // Disable wrong tiles
            document.querySelectorAll('.letter-tile:not(.used)').forEach(tile => {
                if (tile.dataset.letter !== correctLetter) {
                    tile.classList.add('used');
                }
            });
            
            // Highlight the correct letter
            const correctTile = document.querySelector(`.letter-tile[data-letter="${correctLetter}"]:not(.used)`);
            if (correctTile) {
                correctTile.classList.add('hint-reveal');
            }
            
            break;
        }
    }
    
    if (gameState.hintsUsed >= 2) {
        elements.hintBtn.disabled = true;
    }
}

// Reset streak
function resetStreak() {
    gameState.streak = 0;
    elements.streakContainer.classList.remove('hot', 'active');
}

// Reset game
function resetGame() {
    playSound('click');
    elements.gameCompleteModal.classList.remove('show');
    elements.streakContainer.classList.remove('hot');
    
    gameState.currentLevel = 1;
    gameState.currentWordIndex = 0;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.wordsCompleted = 0;
    gameState.selectedTile = null;
    
    showCategorySelection();
}

// Toggle sound
function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    elements.soundIcon.textContent = gameState.soundEnabled ? '🔊' : '🔇';
}

// Update UI
function updateUI() {
    elements.score.textContent = gameState.score;
    elements.streak.textContent = gameState.streak;
    elements.level.textContent = gameState.currentLevel;
}

// Update progress
function updateProgress() {
    const progress = ((gameState.currentWordIndex) / gameState.shuffledWords.length) * 100;
    elements.progressFill.style.width = progress + '%';
    elements.progressText.textContent = `Word ${gameState.currentWordIndex + 1} of ${gameState.shuffledWords.length}`;
}

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem('wordWizardState', JSON.stringify({
        score: gameState.score,
        bestStreak: gameState.bestStreak,
        wordsCompleted: gameState.wordsCompleted
    }));
}

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('wordWizardState');
    if (saved) {
        const data = JSON.parse(saved);
        gameState.score = data.score || 0;
        gameState.bestStreak = data.bestStreak || 0;
        gameState.wordsCompleted = data.wordsCompleted || 0;
        updateUI();
    }
}

// Auto-save periodically
setInterval(saveGameState, 5000);

// Initialize on load
document.addEventListener('DOMContentLoaded', initGame);
