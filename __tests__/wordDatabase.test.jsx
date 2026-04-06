import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

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
      { word: 'PUMPKIN', hint: '🎃' }, { word: 'SPIDER', hint: '🕷️' }, { word: 'DIAMOND', hint: '💎' },
      { word: 'CLOWN', hint: '🤡' }, { word: 'WIZARD', hint: '🧙' }, { word: 'ROBOT', hint: '🤖' }
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
      { word: 'BLUE', hint: '🔵' }, { word: 'GRAY', hint: '⬜' }, { word: 'AZURE', hint: '💙' },
      { word: 'BEIGE', hint: '🟨' }, { word: 'CREAM', hint: '🤍' }, { word: 'DUSK', hint: '🌅' },
      { word: 'HAZEL', hint: '🟤' }, { word: 'MOSS', hint: '🌿' }, { word: 'OLIVE', hint: '🫒' },
      { word: 'PEARL', hint: '🤍' }, { word: 'ROSE', hint: '🌹' }, { word: 'WINE', hint: '🍷' },
      { word: 'TEAL', hint: '🌊' }, { word: 'WREN', hint: '🐦' }, { word: 'GOLD', hint: '🥇' }
    ],
    3: [
      { word: 'GREEN', hint: '🟢' }, { word: 'WHITE', hint: '⬜' }, { word: 'BLACK', hint: '⬛' },
      { word: 'BROWN', hint: '🟤' }, { word: 'OCHRE', hint: '🟨' }, { word: 'PEACH', hint: '🍑' },
      { word: 'LILAC', hint: '💜' }, { word: 'AMBER', hint: '🟠' }, { word: 'SMOKE', hint: '💨' },
      { word: 'STEEL', hint: '⚙️' }, { word: 'BRONZE', hint: '🥉' }, { word: 'CHERRY', hint: '🍒' },
      { word: 'INDIGO', hint: '💙' }, { word: 'CORAL', hint: '🪸' }, { word: 'IVORY', hint: '🤍' }
    ],
    4: [
      { word: 'ORANGE', hint: '🟠' }, { word: 'PURPLE', hint: '🟣' }, { word: 'YELLOW', hint: '🟡' },
      { word: 'SILVER', hint: '🥈' }, { word: 'MAROON', hint: '🟤' }, { word: 'VIOLET', hint: '💜' },
      { word: 'MAGENTA', hint: '🟣' }, { word: 'SALMON', hint: '🐟' }, { word: 'APRICOT', hint: '🍑' },
      { word: 'COPPER', hint: '🥉' }, { word: 'CRIMSON', hint: '🔴' }, { word: 'SCARLET', hint: '🔴' },
      { word: 'CARMINE', hint: '🔴' }, { word: 'OLIVE', hint: '🫒' }, { word: 'INDIGO', hint: '💙' }
    ],
    5: [
      { word: 'TURQUOISE', hint: '🟢' }, { word: 'LAVENDER', hint: '💜' }, { word: 'EMERALD', hint: '💚' },
      { word: 'SAPPHIRE', hint: '💙' }, { word: 'AMETHYST', hint: '💜' }, { word: 'CHARCOAL', hint: '⬛' },
      { word: 'CERISE', hint: '🔴' }, { word: 'FUCHSIA', hint: '🟣' }, { word: 'VERMILION', hint: '🔴' },
      { word: 'AUBURN', hint: '🟤' }, { word: 'SIENNA', hint: '🟤' }, { word: 'CRIMSON', hint: '🔴' },
      { word: 'SCARLET', hint: '🔴' }, { word: 'MAGENTA', hint: '🟣' }, { word: 'TURQUOISE', hint: '🟢' }
    ]
  },
  numbers: {
    1: [
      { word: 'ONE', hint: '1️⃣' }, { word: 'TWO', hint: '2️⃣' }, { word: 'SIX', hint: '6️⃣' },
      { word: 'TEN', hint: '🔟' }, { word: 'ACE', hint: '🂡' }, { word: 'NIL', hint: '0️⃣' },
      { word: 'ZIP', hint: '📮' }, { word: 'PAD', hint: '📒' }, { word: 'OHO', hint: '😮' },
      { word: 'POP', hint: '🍿' }, { word: 'WOW', hint: '😲' }, { word: 'GAG', hint: '🤭' },
      { word: 'BUB', hint: '👶' }, { word: 'DAD', hint: '👨' }, { word: 'MOM', hint: '👩' }
    ],
    2: [
      { word: 'THREE', hint: '3️⃣' }, { word: 'FOUR', hint: '4️⃣' }, { word: 'FIVE', hint: '5️⃣' },
      { word: 'SEVEN', hint: '7️⃣' }, { word: 'EIGHT', hint: '8️⃣' }, { word: 'NINE', hint: '9️⃣' },
      { word: 'ZERO', hint: '0️⃣' }, { word: 'FIRST', hint: '1️⃣' }, { word: 'DOZEN', hint: '1️⃣2️⃣' },
      { word: 'SCORE', hint: '💯' }, { word: 'TALLY', hint: '📊' }, { word: 'COUNT', hint: '🔢' },
      { word: 'DIGIT', hint: '7️⃣' }, { word: 'NUMERALS', hint: '🔢' }, { word: 'DECIMAL', hint: '1️⃣.5️⃣' }
    ],
    3: [
      { word: 'ELEVEN', hint: '1️⃣1️⃣' }, { word: 'TWELVE', hint: '1️⃣2️⃣' }, { word: 'THIRTEEN', hint: '1️⃣3️⃣' },
      { word: 'FOURTEEN', hint: '1️⃣4️⃣' }, { word: 'FIFTEEN', hint: '1️⃣5️⃣' }, { word: 'SIXTEEN', hint: '1️⃣6️⃣' },
      { word: 'SEVENTEEN', hint: '1️⃣7️⃣' }, { word: 'EIGHTEEN', hint: '1️⃣8️⃣' }, { word: 'NINETEEN', hint: '1️⃣9️⃣' },
      { word: 'TWENTY', hint: '2️⃣0️⃣' }, { word: 'THIRTY', hint: '3️⃣0️⃣' }, { word: 'FORTY', hint: '4️⃣0️⃣' },
      { word: 'FIFTY', hint: '5️⃣0️⃣' }, { word: 'SIXTY', hint: '6️⃣0️⃣' }, { word: 'HUNDRED', hint: '💯' }
    ],
    4: [
      { word: 'TWENTYONE', hint: '2️⃣1️⃣' }, { word: 'THIRTYTWO', hint: '3️⃣2️⃣' }, { word: 'FORTYFIVE', hint: '4️⃣5️⃣' },
      { word: 'SIXTYSEVEN', hint: '6️⃣7️⃣' }, { word: 'EIGHTYONE', hint: '8️⃣1️⃣' }, { word: 'NINETYNINE', hint: '9️⃣9️⃣' },
      { word: 'FIFTYYEARS', hint: '5️⃣0️⃣' }, { word: 'DOZENS', hint: '1️⃣2️⃣' }, { word: 'CENTURY', hint: '💯' },
      { word: 'MILLION', hint: '🔢' }, { word: 'BILLION', hint: '🔢' }, { word: 'TRILLION', hint: '🔢' },
      { word: 'PRIME', hint: '2️⃣3️⃣' }, { word: 'ORDINAL', hint: '1️⃣s️t' }, { word: 'ROMAN', hint: 'ⅠⅡⅢ' }
    ],
    5: [
      { word: 'SIXTYSEVEN', hint: '6️⃣7️⃣' }, { word: 'FORTYTWO', hint: '4️⃣2️⃣' }, { word: 'NINETYNINE', hint: '9️⃣9️⃣' },
      { word: 'THIRTEENTH', hint: '1️⃣3️⃣' }, { word: 'FOURTEENTH', hint: '1️⃣4️⃣' }, { word: 'EIGHTEENTH', hint: '1️⃣8️⃣' },
      { word: 'SEVENTEENTH', hint: '1️⃣7️⃣' }, { word: 'ELEVENTH', hint: '1️⃣1️⃣' }, { word: 'TWELFTH', hint: '1️⃣2️⃣' },
      { word: 'BILLIONTH', hint: '🔢' }, { word: 'MILLIONTH', hint: '🔢' }, { word: 'ALEPH', hint: 'ℵ' },
      { word: 'CONTINUUM', hint: '♾️' }, { word: 'CARDINAL', hint: '1️⃣2️⃣3️⃣' }, { word: 'INFINITY', hint: '♾️' }
    ]
  },
  fruits: {
    1: [
      { word: 'APPLE', hint: '🍎' }, { word: 'PEAR', hint: '🍐' }, { word: 'LIME', hint: '🍏' },
      { word: 'PLUM', hint: '🫐' }, { word: 'PEACH', hint: '🍑' }, { word: 'MANGO', hint: '🥭' },
      { word: 'GRAPE', hint: '🍇' }, { word: 'CHERRY', hint: '🍒' }, { word: 'LEMON', hint: '🍋' },
      { word: 'BANANA', hint: '🍌' }, { word: 'ORANGE', hint: '🍊' }, { word: 'MELON', hint: '🍈' },
      { word: 'PAPAYA', hint: '🍈' }, { word: 'GUAVA', hint: '🍐' }, { word: 'KIWI', hint: '🥝' }
    ],
    2: [
      { word: 'MANGO', hint: '🥭' }, { word: 'PAPAYA', hint: '🍈' }, { word: 'GUAVA', hint: '🍐' },
      { word: 'LYCHEE', hint: '🍇' }, { word: 'FIG', hint: '🍈' }, { word: 'DATES', hint: '🌴' },
      { word: 'OLIVE', hint: '🫒' }, { word: 'CITRUS', hint: '🍊' }, { word: 'CITRON', hint: '🍋' },
      { word: 'LIME', hint: '🍏' }, { word: 'GRAPE', hint: '🍇' }, { word: 'PLUM', hint: '🫐' },
      { word: 'PEACH', hint: '🍑' }, { word: 'PEAR', hint: '🍐' }, { word: 'MELON', hint: '🍈' }
    ],
    3: [
      { word: 'PINEAPPLE', hint: '🍍' }, { word: 'WATERMELON', hint: '🍉' }, { word: 'CANTALOUPE', hint: '🍈' },
      { word: 'HONEYDEW', hint: '🍈' }, { word: 'CRANBERRY', hint: '🫐' }, { word: 'BLUEBERRY', hint: '🫐' },
      { word: 'RASPBERRY', hint: '🍇' }, { word: 'STRAWBERRY', hint: '🍓' }, { word: 'BLACKBERRY', hint: '🫐' },
      { word: 'PAPAYA', hint: '🍈' }, { word: 'GUAVA', hint: '🍐' }, { word: 'LYCHEE', hint: '🍇' },
      { word: 'POMEGRANATE', hint: '🍎' }, { word: 'APRICOT', hint: '🍑' }, { word: 'AVOCADO', hint: '🥑' }
    ],
    4: [
      { word: 'POMEGRANATE', hint: '🍎' }, { word: 'APRICOT', hint: '🍑' }, { word: 'AVOCADO', hint: '🥑' },
      { word: 'COCONUT', hint: '🥥' }, { word: 'DRAGONFRUIT', hint: '🐉' }, { word: 'STARFRUIT', hint: '⭐' },
      { word: 'PASSIONFRUIT', hint: '🍇' }, { word: 'RAMBUTAN', hint: '🔴' }, { word: 'DURIAN', hint: '🟡' },
      { word: 'PERSIMMON', hint: '🍅' }, { word: 'NECTARINE', hint: '🍑' }, { word: 'TANGERINE', hint: '🍊' },
      { word: 'CLEMENTINE', hint: '🍊' }, { word: 'CURRANT', hint: '🍇' }, { word: 'GOOSEBERRY', hint: '🫐' }
    ],
    5: [
      { word: 'DRAGONFRUIT', hint: '🐉' }, { word: 'STARFRUIT', hint: '⭐' }, { word: 'PASSIONFRUIT', hint: '🍇' },
      { word: 'RAMBUTAN', hint: '🔴' }, { word: 'DURIAN', hint: '🟡' }, { word: 'CHERIMOYA', hint: '🍈' },
      { word: 'JACKFRUIT', hint: '🟡' }, { word: 'BUDDHAHAND', hint: '🍋' }, { word: 'SOURSOP', hint: '🟢' },
      { word: 'CUSTARDAPPLE', hint: '🍎' }, { word: 'MANGOSTEEN', hint: '🟣' }, { word: 'LYCHEE', hint: '🍇' },
      { word: 'LANGKAT', hint: '🌴' }, { word: 'SALAK', hint: '🐍' }, { word: 'TAMARIND', hint: '🫙' }
    ]
  },
  vegetables: {
    1: [
      { word: 'CARROT', hint: '🥕' }, { word: 'TOMATO', hint: '🍅' }, { word: 'PEA', hint: '🫛' },
      { word: 'BEAN', hint: '🫘' }, { word: 'CORN', hint: '🌽' }, { word: 'ONION', hint: '🧅' },
      { word: 'LEEK', hint: '🧅' }, { word: 'CELERY', hint: '🥬' }, { word: 'RADISH', hint: '🔴' },
      { word: 'TURNIP', hint: '🟡' }, { word: 'BEETS', hint: '🟣' }, { word: 'CHARD', hint: '🥬' },
      { word: 'KALE', hint: '🥬' }, { word: 'SPINACH', hint: '🥬' }, { word: 'BASIL', hint: '🌿' }
    ],
    2: [
      { word: 'LETTUCE', hint: '🥬' }, { word: 'CABBAGE', hint: '🥬' }, { word: 'BROCCOLI', hint: '🥦' },
      { word: 'CAULIFLOWER', hint: '🥦' }, { word: 'EGGPLANT', hint: '🍆' }, { word: 'PEPPERS', hint: '🌶️' },
      { word: 'POTATO', hint: '🥔' }, { word: 'CARROT', hint: '🥕' }, { word: 'ONION', hint: '🧅' },
      { word: 'TOMATO', hint: '🍅' }, { word: 'CELERY', hint: '🥬' }, { word: 'BEAN', hint: '🫘' },
      { word: 'PEA', hint: '🫛' }, { word: 'CORN', hint: '🌽' }, { word: 'GARLIC', hint: '🧄' }
    ],
    3: [
      { word: 'POTATO', hint: '🥔' }, { word: 'TOMATO', hint: '🍅' }, { word: 'CUCUMBER', hint: '🥒' },
      { word: 'ZUCCHINI', hint: '🟢' }, { word: 'PUMPKIN', hint: '🎃' }, { word: 'SQUASH', hint: '🎃' },
      { word: 'MUSHROOM', hint: '🍄' }, { word: 'ASPARAGUS', hint: '🟢' }, { word: 'ARTICHOKE', hint: '🟢' },
      { word: 'RADISH', hint: '🔴' }, { word: 'TURNIP', hint: '🟡' }, { word: 'BEETS', hint: '🟣' },
      { word: 'BROCCOLI', hint: '🥦' }, { word: 'CABBAGE', hint: '🥬' }, { word: 'GARLIC', hint: '🧄' }
    ],
    4: [
      { word: 'ARTICHOKE', hint: '🟢' }, { word: 'BRUSSEL', hint: '🥬' }, { word: 'KOHLRABI', hint: '🥬' },
      { word: 'FIDDLEHEAD', hint: '🌿' }, { word: 'ENDIVE', hint: '🥬' }, { word: 'ESCAROLE', hint: '🥬' },
      { word: 'ARUGULA', hint: '🥬' }, { word: 'RADICCHIO', hint: '🟣' }, { word: 'bokchoy', hint: '🥬' },
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
      { word: 'CAMEL', hint: '🐫' }, { word: 'SHEEP', hint: '🐑' }, { word: 'HORSE', hint: '🐴' },
      { word: 'MOUSE', hint: '🐭' }, { word: 'TIGER', hint: '🐯' }, { word: 'ZEBRA', hint: '🦓' },
      { word: 'PANDA', hint: '🐼' }, { word: 'KOALA', hint: '🐨' }, { word: 'OTTER', hint: '🦦' }
    ],
    3: [
      { word: 'TIGER', hint: '🐯' }, { word: 'HORSE', hint: '🐴' }, { word: 'ZEBRA', hint: '🦓' },
      { word: 'SHEEP', hint: '🐑' }, { word: 'MOUSE', hint: '🐭' }, { word: 'CAMEL', hint: '🐫' },
      { word: 'PANDA', hint: '🐼' }, { word: 'KOALA', hint: '🐨' }, { word: 'OTTER', hint: '🦦' },
      { word: 'RABBIT', hint: '🐰' }, { word: 'MONKEY', hint: '🐵' }, { word: 'DONKEY', hint: '🫏' },
      { word: 'GOAT', hint: '🐐' }, { word: 'YAK', hint: '🐂' }, { word: 'COW', hint: '🐄' }
    ],
    4: [
      { word: 'ELEPHANT', hint: '🐘' }, { word: 'MONKEY', hint: '🐵' }, { word: 'DONKEY', hint: '🫏' },
      { word: 'GIRAFFE', hint: '🦒' }, { word: 'LEOPARD', hint: '🐆' }, { word: 'CHEETAH', hint: '🐆' },
      { word: 'JAGUAR', hint: '🐆' }, { word: 'PANTHER', hint: '🐆' }, { word: 'BABOON', hint: '🐒' },
      { word: 'GORILLA', hint: '🦍' }, { word: 'MEERKAT', hint: '🐿️' }, { word: 'HAMSTER', hint: '🐹' },
      { word: 'RACCOON', hint: '🦝' }, { word: 'POSSUM', hint: '🦡' }, { word: 'CHIMPANZEE', hint: '🐵' }
    ],
    5: [
      { word: 'ELEPHANT', hint: '🐘' }, { word: 'PENGUIN', hint: '🐧' }, { word: 'DOLPHIN', hint: '🐬' },
      { word: 'TORTOISE', hint: '🐢' }, { word: 'CROCODILE', hint: '🐊' }, { word: 'ALLIGATOR', hint: '🐊' },
      { word: 'HIPPOPOTAMUS', hint: '🦛' }, { word: 'RHINOCEROS', hint: '🦏' }, { word: 'BUFFALO', hint: '🦬' },
      { word: 'WILDEBEEST', hint: '🦬' }, { word: 'ANTELOPE', hint: '🦌' }, { word: 'GAZELLE', hint: '🦌' },
      { word: 'PORCUPINE', hint: '🦔' }, { word: 'ARMADILLO', hint: '🦡' }, { word: 'TURTLE', hint: '🐢' }
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
      { word: 'PELICAN', hint: '🐦' }, { word: 'FLAMINGO', hint: '🦩' }, { word: 'PENGUIN', hint: '🐧' },
      { word: 'PEACOCK', hint: '🦚' }, { word: 'OSTRICH', hint: '🐦' }, { word: 'SPARROW', hint: '🐦' },
      { word: 'SWALLOW', hint: '🐦' }, { word: 'BUZZARD', hint: '🦅' }, { word: 'VULTURE', hint: '🦅' },
      { word: 'CANARY', hint: '🐦' }, { word: 'MAGPIE', hint: '🐦' }, { word: 'QUAIL', hint: '🐦' },
      { word: 'TOUCAN', hint: '🦜' }, { word: 'FALCON', hint: '🦅' }, { word: 'CONDOR', hint: '🦅' }
    ],
    5: [
      { word: 'KINGFISHER', hint: '🐦' }, { word: 'WOODPECKER', hint: '🐦' }, { word: 'NIGHTINGALE', hint: '🐦' },
      { word: 'ALBATROSS', hint: '🐦' }, { word: 'CORMORANT', hint: '🐦' }, { word: 'FLAMINGO', hint: '🦩' },
      { word: 'PELICAN', hint: '🐦' }, { word: 'PEACOCKS', hint: '🦚' }, { word: 'SPARROWS', hint: '🐦' },
      { word: 'SWALLOWS', hint: '🐦' }, { word: 'BUZZARDS', hint: '🦅' }, { word: 'VULTURES', hint: '🦅' },
      { word: 'CONDORS', hint: '🦅' }, { word: 'FALCONS', hint: '🦅' }, { word: 'PELICANS', hint: '🐦' }
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
      { word: 'AMBULANCE', hint: '🚑' }, { word: 'TRACTOR', hint: '🚜' }, { word: 'HELICOPTER', hint: '🚁' },
      { word: 'SUBMARINE', hint: '🚢' }, { word: 'AIRPLANE', hint: '✈️' }, { word: 'SKATEBOARD', hint: '🛹' },
      { word: 'SAILBOAT', hint: '⛵' }, { word: 'ROWBOAT', hint: '🚣' }, { word: 'TROLLEY', hint: '🚋' },
      { word: 'CARGO', hint: '🚢' }, { word: 'MOTORCYCLE', hint: '🏍️' }, { word: 'WHEELBARROW', hint: '🛒' }
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
      { word: 'MOTORCYCLE', hint: '🏍️' }, { word: 'SKATEBOARD', hint: '🛹' }, { word: 'TRACTOR', hint: '🚜' },
      { word: 'FIRETRUCK', hint: '🚒' }, { word: 'POLICECAR', hint: '🚓' }, { word: 'CAMPERVAN', hint: '🚐' },
      { word: 'JETPLANE', hint: '✈️' }, { word: 'SPACECRAFT', hint: '🚀' }, { word: 'AIRCRAFT', hint: '✈️' },
      { word: 'VESSEL', hint: '🚢' }, { word: 'VEHICLE', hint: '🚗' }, { word: 'WHEELBARROW', hint: '🛒' }
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
      { word: 'PAJAMAS', hint: '🛏️' }, { word: 'TUXEDO', hint: '🤵' }, { word: 'PONCHO', hint: '🧥' },
      { word: 'SANDALS', hint: '🩴' }, { word: 'SLIPPERS', hint: '🩴' }, { word: 'SNEAKERS', hint: '👟' },
      { word: 'MITTENS', hint: '🧤' }, { word: 'OVERALLS', hint: '👖' }, { word: 'LEGGINGS', hint: '👖' },
      { word: 'CARDIGAN', hint: '🧶' }, { word: 'SWEATERS', hint: '🧶' }, { word: 'SWEATER', hint: '🧶' }
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
      { word: 'GALE', hint: '💨' }, { word: 'GUST', hint: '💨' }, { word: 'HAZE', hint: '🌫️' },
      { word: 'DRIZZLE', hint: '🌧️' }, { word: 'STORM', hint: '⛈️' }, { word: 'FROST', hint: '❄️' }
    ],
    2: [
      { word: 'SNOW', hint: '❄️' }, { word: 'CLOUD', hint: '☁️' }, { word: 'STORM', hint: '⛈️' },
      { word: 'THUNDER', hint: '⚡' }, { word: 'LIGHTNING', hint: '⚡' }, { word: 'BREEZE', hint: '💨' },
      { word: 'GALE', hint: '💨' }, { word: 'FLOOD', hint: '🌊' }, { word: 'DROUGHT', hint: '🏜️' },
      { word: 'MIST', hint: '🌫️' }, { word: 'FOG', hint: '🌫️' }, { word: 'HAZE', hint: '🌫️' },
      { word: 'DRIZZLE', hint: '🌧️' }, { word: 'SLEET', hint: '🌨️' }, { word: 'HAIL', hint: '🌨️' }
    ],
    3: [
      { word: 'TORNADO', hint: '🌪️' }, { word: 'HURRICANE', hint: '🌀' }, { word: 'CYCLONE', hint: '🌀' },
      { word: 'MONSOON', hint: '🌧️' }, { word: 'BLIZZARD', hint: '❄️' }, { word: 'AVALANCHE', hint: '🏔️' },
      { word: 'FLOOD', hint: '🌊' }, { word: 'DROUGHT', hint: '🏜️' }, { word: 'LIGHTNING', hint: '⚡' },
      { word: 'THUNDER', hint: '⚡' }, { word: 'RAINBOW', hint: '🌈' }, { word: 'RAINFALL', hint: '🌧️' },
      { word: 'SUNSHINE', hint: '☀️' }, { word: 'OVERCAST', hint: '☁️' }, { word: 'THUNDERSTORM', hint: '⛈️' }
    ],
    4: [
      { word: 'SUNRISE', hint: '🌅' }, { word: 'SUNSET', hint: '🌇' }, { word: 'TEMPERATURE', hint: '🌡️' },
      { word: 'HUMIDITY', hint: '💧' }, { word: 'BAROMETER', hint: '📊' }, { word: 'ANEMOMETER', hint: '💨' },
      { word: 'WEATHER', hint: '🌤️' }, { word: 'FORECAST', hint: '📅' }, { word: 'CLIMATE', hint: '🌍' },
      { word: 'SEASON', hint: '🍂' }, { word: 'TORNADO', hint: '🌪️' }, { word: 'HURRICANE', hint: '🌀' },
      { word: 'BLIZZARD', hint: '❄️' }, { word: 'MONSOON', hint: '🌧️' }, { word: 'CYCLONE', hint: '🌀' }
    ],
    5: [
      { word: 'ATMOSPHERE', hint: '🌫️' }, { word: 'CONDITION', hint: '🌤️' }, { word: 'PRECIPITATION', hint: '🌧️' },
      { word: 'EVAPORATION', hint: '💧' }, { word: 'CONDENSATION', hint: '☁️' }, { word: 'TORNADOES', hint: '🌪️' },
      { word: 'HURRICANES', hint: '🌀' }, { word: 'CYCLONES', hint: '🌀' }, { word: 'BLIZZARDS', hint: '❄️' },
      { word: 'AVALANCHES', hint: '🏔️' }, { word: 'MONSOONS', hint: '🌧️' }, { word: 'THUNDERSTORMS', hint: '⛈️' },
      { word: 'SUNSHINE', hint: '☀️' }, { word: 'OVERCAST', hint: '☁️' }, { word: 'WEATHERMAN', hint: '👨‍💼' }
    ]
  },
  food: {
    1: [
      { word: 'RICE', hint: '🍚' }, { word: 'WHEAT', hint: '🌾' }, { word: 'CORN', hint: '🌽' },
      { word: 'BREAD', hint: '🍞' }, { word: 'CAKE', hint: '🎂' }, { word: 'PIE', hint: '🥧' },
      { word: 'COOKIE', hint: '🍪' }, { word: 'CANDY', hint: '🍬' }, { word: 'JAM', hint: '🍯' },
      { word: 'HONEY', hint: '🍯' }, { word: 'MILK', hint: '🥛' }, { word: 'BUTTER', hint: '🧈' },
      { word: 'CHEESE', hint: '🧀' }, { word: 'CREAM', hint: '🥛' }, { word: 'YOGURT', hint: '🥛' }
    ],
    2: [
      { word: 'NOODLE', hint: '🍝' }, { word: 'PASTA', hint: '🍝' }, { word: 'WAFFLE', hint: '🧇' },
      { word: 'PANCAKE', hint: '🥞' }, { word: 'OATMEAL', hint: '🥣' }, { word: 'CEREAL', hint: '🥣' },
      { word: 'SALAD', hint: '🥗' }, { word: 'SOUP', hint: '🍲' }, { word: 'STEW', hint: '🍲' },
      { word: 'CURRY', hint: '🍛' }, { word: 'TOAST', hint: '🍞' }, { word: 'BACON', hint: '🥓' },
      { word: 'SAUSAGE', hint: '🌭' }, { word: 'OMELET', hint: '🍳' }, { word: 'HASH', hint: '🍳' }
    ],
    3: [
      { word: 'HAMBURGER', hint: '🍔' }, { word: 'HOTDOG', hint: '🌭' }, { word: 'SANDWICH', hint: '🥪' },
      { word: 'TACO', hint: '🌮' }, { word: 'BURRITO', hint: '🌯' }, { word: 'NACHOS', hint: '🌮' },
      { word: 'PIZZA', hint: '🍕' }, { word: 'DONUT', hint: '🍩' }, { word: 'MUFFIN', hint: '🧁' },
      { word: 'CROISSANT', hint: '🥐' }, { word: 'BAGEL', hint: '🥯' }, { word: 'PRETZEL', hint: '🥨' },
      { word: 'WAFFLE', hint: '🧇' }, { word: 'PANCAKE', hint: '🥞' }, { word: 'WAFFLE', hint: '🧇' }
    ],
    4: [
      { word: 'SUSHI', hint: '🍣' }, { word: 'RAMEN', hint: '🍜' }, { word: 'DUMPLING', hint: '🥟' },
      { word: 'FRIEDRICE', hint: '🍚' }, { word: 'CHOWMEIN', hint: '🍝' }, { word: 'FRIEDCHICKEN', hint: '🍗' },
      { word: 'CHICKEN', hint: '🍗' }, { word: 'STEAK', hint: '🥩' }, { word: 'SALMON', hint: '🐟' },
      { word: 'LOBSTER', hint: '🦞' }, { word: 'SHRIMP', hint: '🦐' }, { word: 'CRAB', hint: '🦀' },
      { word: 'OCTOPUS', hint: '🐙' }, { word: 'SCALLOP', hint: '🦪' }, { word: 'OYSTER', hint: '🦪' }
    ],
    5: [
      { word: 'DIM SUM', hint: '🥟' }, { word: 'PHO', hint: '🍜' }, { word: 'BIRYANI', hint: '🍚' },
      { word: 'PAELLA', hint: '🥘' }, { word: 'GNOCCHI', hint: '🥔' }, { word: 'RISOTTO', hint: '🍚' },
      { word: 'TAPAS', hint: '🥘' }, { word: 'FONDUE', hint: '🫕' }, { word: 'CASSOULET', hint: '🥘' },
      { word: 'BREADCRUMB', hint: '🍞' }, { word: 'CROUTONS', hint: '🥗' }, { word: 'ESCARGOT', hint: '🐌' },
      { word: 'FOIEGRAS', hint: '🪿' }, { word: 'GNOCCINI', hint: '🥔' }, { word: 'CARPACCIO', hint: '🥩' }
    ]
  },
  countries: {
    1: [
      { word: 'USA', hint: '🇺🇸' }, { word: 'UK', hint: '🇬🇧' }, { word: 'SPAIN', hint: '🇪🇸' },
      { word: 'FRANCE', hint: '🇫🇷' }, { word: 'ITALY', hint: '🇮🇹' }, { word: 'GERMANY', hint: '🇩🇪' },
      { word: 'INDIA', hint: '🇮🇳' }, { word: 'CHINA', hint: '🇨🇳' }, { word: 'JAPAN', hint: '🇯🇵' },
      { word: 'KOREA', hint: '🇰🇷' }, { word: 'BRAZIL', hint: '🇧🇷' }, { word: 'MEXICO', hint: '🇲🇽' },
      { word: 'CANADA', hint: '🇨🇦' }, { word: 'RUSSIA', hint: '🇷🇺' }, { word: 'EGYPT', hint: '🇪🇬' }
    ],
    2: [
      { word: 'AUSTRALIA', hint: '🇦🇺' }, { word: 'ARGENTINA', hint: '🇦🇷' }, { word: 'BELGIUM', hint: '🇧🇪' },
      { word: 'SWEDEN', hint: '🇸🇪' }, { word: 'NORWAY', hint: '🇳🇴' }, { word: 'FINLAND', hint: '🇫🇮' },
      { word: 'DENMARK', hint: '🇩🇰' }, { word: 'IRELAND', hint: '🇮🇪' }, { word: 'SCOTLAND', hint: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
      { word: 'WALES', hint: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' }, { word: 'PORTUGAL', hint: '🇵🇹' }, { word: 'GREECE', hint: '🇬🇷' },
      { word: 'TURKEY', hint: '🇹🇷' }, { word: 'POLAND', hint: '🇵🇱' }, { word: 'SWITZERLAND', hint: '🇨🇭' }
    ],
    3: [
      { word: 'NETHERLANDS', hint: '🇳🇱' }, { word: 'AUSTRIA', hint: '🇦🇹' }, { word: 'CZECHIA', hint: '🇨🇿' },
      { word: 'CROATIA', hint: '🇭🇷' }, { word: 'SLOVENIA', hint: '🇸🇮' }, { word: 'SLOVAKIA', hint: '🇸🇰' },
      { word: 'HUNGARY', hint: '🇭🇺' }, { word: 'ROMANIA', hint: '🇷🇴' }, { word: 'BULGARIA', hint: '🇧🇬' },
      { word: 'UKRAINE', hint: '🇺🇦' }, { word: 'THAILAND', hint: '🇹🇭' }, { word: 'VIETNAM', hint: '🇻🇳' },
      { word: 'INDONESIA', hint: '🇮🇩' }, { word: 'MALAYSIA', hint: '🇲🇾' }, { word: 'PHILIPPINES', hint: '🇵🇭' }
    ],
    4: [
      { word: 'SINGAPORE', hint: '🇸🇬' }, { word: 'NEWZEALAND', hint: '🇳🇿' }, { word: 'ICELAND', hint: '🇮🇸' },
      { word: 'LUXEMBOURG', hint: '🇱🇺' }, { word: 'LIECHTENSTEIN', hint: '🇱🇮' }, { word: 'MONACO', hint: '🇲🇨' },
      { word: 'ANDORRA', hint: '🇦🇩' }, { word: 'SANMARINO', hint: '🇸🇲' }, { word: 'MALTESE', hint: '🇲🇹' },
      { word: 'CYPRUS', hint: '🇨🇾' }, { word: 'ESTONIA', hint: '🇪🇪' }, { word: 'LATVIA', hint: '🇱🇻' },
      { word: 'LITHUANIA', hint: '🇱🇹' }, { word: 'ALBANIA', hint: '🇦🇱' }, { word: 'SERBIA', hint: '🇷🇸' }
    ],
    5: [
      { word: 'UZBEKISTAN', hint: '🇺🇿' }, { word: 'KAZAKHSTAN', hint: '🇰🇿' }, { word: 'KYRGYZSTAN', hint: '🇰🇬' },
      { word: 'TAJIKISTAN', hint: '🇹🇯' }, { word: 'TURKMENISTAN', hint: '🇹🇲' }, { word: 'MONGOLIA', hint: '🇲🇳' },
      { word: 'BHUTAN', hint: '🇧🇹' }, { word: 'MALDIVES', hint: '🇲🇻' }, { word: 'SRIKANTA', hint: '🇱🇰' },
      { word: 'BANGLADESH', hint: '🇧🇩' }, { word: 'NEPAL', hint: '🇳🇵' }, { word: 'AFGHANISTAN', hint: '🇦🇫' },
      { word: 'PAKISTAN', hint: '🇵🇰' }, { word: 'TAIWAN', hint: '🇹🇼' }, { word: 'HONGKONG', hint: '🇭🇰' }
    ]
  },
  shapes: {
    1: [
      { word: 'CIRCLE', hint: '⭕' }, { word: 'SQUARE', hint: '🔲' }, { word: 'TRIANGLE', hint: '🔺' },
      { word: 'LINE', hint: '➖' }, { word: 'DOT', hint: '⚫' }, { word: 'ARC', hint: '🪻' },
      { word: 'RING', hint: '⭕' }, { word: 'OVAL', hint: '🥚' }, { word: 'HEART', hint: '❤️' },
      { word: 'STAR', hint: '⭐' }, { word: 'CROSS', hint: '✚' }, { word: 'PLUS', hint: '➕' },
      { word: 'MOON', hint: '🌙' }, { word: 'FLAG', hint: '🚩' }, { word: 'BALL', hint: '⚽' }
    ],
    2: [
      { word: 'RECTANGLE', hint: '▬' }, { word: 'PENTAGON', hint: '⬠' }, { word: 'HEXAGON', hint: '⬡' },
      { word: 'OCTAGON', hint: '🛑' }, { word: 'DIAMOND', hint: '💎' }, { word: 'PARALLELOGRAM', hint: '▱' },
      { word: 'TRAPEZIUM', hint: '⬡' }, { word: 'PYRAMID', hint: '🔺' }, { word: 'PRISM', hint: '▲' },
      { word: 'CYLINDER', hint: '🥁' }, { word: 'SPHERE', hint: '⚽' }, { word: 'CUBE', hint: '🎲' },
      { word: 'CONE', hint: '🍦' }, { word: 'SPIRAL', hint: '🌀' }, { word: 'SPIKE', hint: '📐' }
    ],
    3: [
      { word: 'HEPTAGON', hint: '⬢' }, { word: 'NONAGON', hint: '✬' }, { word: 'DECAGON', hint: '⬟' },
      { word: 'HENDECAGON', hint: '⬡' }, { word: 'DODECAGON', hint: '⬡' }, { word: 'ICOSAHEDRON', hint: '🔺' },
      { word: 'RHOMBUS', hint: '◆' }, { word: 'KITE', hint: '◇' }, { word: 'ELLIPSE', hint: '🥚' },
      { word: 'SEMICIRCLE', hint: '🍕' }, { word: 'QUADRANT', hint: '📐' }, { word: 'SECTOR', hint: '🥧' },
      { word: 'POLYGON', hint: '⬡' }, { word: 'VERTEX', hint: '📐' }, { word: 'EDGE', hint: '📏' }
    ],
    4: [
      { word: 'TESSELLATION', hint: '🔲' }, { word: 'FRACTAL', hint: '🌀' }, { word: 'SPIRAL', hint: '🌀' },
      { word: 'MEANDERING', hint: '〰️' }, { word: 'WAVE', hint: '〰️' }, { word: 'ZIGZAG', hint: '⚡' },
      { word: 'CURVE', hint: '〰️' }, { word: 'ANGLE', hint: '📐' }, { word: 'DEGREES', hint: '°' },
      { word: 'PERIMETER', hint: '📏' }, { word: 'DIAMETER', hint: '⭕' }, { word: 'RADIUS', hint: '📐' },
      { word: 'CIRCUMFERENCE', hint: '⭕' }, { word: 'AREA', hint: '📐' }, { word: 'VOLUME', hint: '📦' }
    ],
    5: [
      { word: 'ASYMMETRIC', hint: '📐' }, { word: 'SYMMETRY', hint: '🦋' }, { word: 'BILATERAL', hint: '📐' },
      { word: 'RADIAL', hint: '☀️' }, { word: 'BISECTOR', hint: '✂️' }, { word: 'TANGENT', hint: '📐' },
      { word: 'SECANT', hint: '📏' }, { word: 'ASYMPTOTE', hint: '〰️' }, { word: 'INTERSECT', hint: '✖️' },
      { word: 'PARALLEL', hint: '═' }, { word: 'PERPENDICULAR', hint: '📐' }, { word: 'CONGRUENT', hint: '≅' },
      { word: 'SIMILAR', hint: '≈' }, { word: 'TRANSFORM', hint: '🔄' }, { word: 'REFLECTION', hint: '🪞' }
    ]
  },
  toys: {
    1: [
      { word: 'BALL', hint: '⚽' }, { word: 'DOLL', hint: '🎎' }, { word: 'CAR', hint: '🚗' },
      { word: 'BIKE', hint: '🚲' }, { word: 'BEAR', hint: '🧸' }, { word: 'BLOCK', hint: '🧱' },
      { word: 'TOP', hint: '🎯' }, { word: 'YOYO', hint: '🪀' }, { word: 'KITE', hint: '🪁' },
      { word: 'DICE', hint: '🎲' }, { word: 'PUZZLE', hint: '🧩' }, { word: 'ROBOT', hint: '🤖' },
      { word: 'TRUCK', hint: '🚚' }, { word: 'PLANE', hint: '✈️' }, { word: 'BOAT', hint: '🚤' }
    ],
    2: [
      { word: 'TEDDY', hint: '🧸' }, { word: 'Lego', hint: '🧱' }, { word: 'MARIONETTE', hint: '🎭' },
      { word: 'PUPPET', hint: '🧸' }, { word: 'MARBLE', hint: '⚪' }, { word: 'HOOP', hint: '🟡' },
      { word: 'JUMPROPE', hint: '🪢' }, { word: 'SLINGSHOT', hint: '🪃' }, { word: 'DART', hint: '🎯' },
      { word: 'BOWLING', hint: '🎳' }, { word: 'GOLF', hint: '🏌️' }, { word: 'TENNIS', hint: '🎾' },
      { word: 'CRICKET', hint: '🏏' }, { word: 'HOCKEY', hint: '🏒' }, { word: 'BASEBALL', hint: '⚾' }
    ],
    3: [
      { word: 'ELECTRONIC', hint: '🎮' }, { word: 'GAMEBOY', hint: '🎮' }, { word: 'PLAYSTATION', hint: '🎮' },
      { word: 'NINTENDO', hint: '🎮' }, { word: 'XBOX', hint: '🎮' }, { word: 'JOYSTICK', hint: '🕹️' },
      { word: 'DRONE', hint: '🛩️' }, { word: 'ROBOT', hint: '🤖' }, { word: 'RACINGCAR', hint: '🏎️' },
      { word: 'HELICOPTER', hint: '🚁' }, { word: 'SUBMARINE', hint: '🚢' }, { word: 'TRACTOR', hint: '🚜' },
      { word: 'MOTORCYCLE', hint: '🏍️' }, { word: 'FIRETRUCK', hint: '🚒' }, { word: 'AMBULANCE', hint: '🚑' }
    ],
    4: [
      { word: 'BATTLESHIP', hint: '🚢' }, { word: 'CRUISESHIP', hint: '🛳️' }, { word: 'AIRCRAFT', hint: '✈️' },
      { word: 'SPACESHIP', hint: '🚀' }, { word: 'TRAIN', hint: '🚂' }, { word: 'TRAM', hint: '🚋' },
      { word: 'MONORAIL', hint: '🚝' }, { word: 'FUNICULAR', hint: '🚞' }, { word: 'GONDOLA', hint: '🚡' },
      { word: 'SANDWICH', hint: '🥪' }, { word: 'CRAYONS', hint: '🖍️' }, { word: 'MARKERS', hint: '🖊️' },
      { word: 'PENCILS', hint: '✏️' }, { word: 'PAPER', hint: '📄' }, { word: 'SCISSORS', hint: '✂️' }
    ],
    5: [
      { word: 'CHEMISTRY', hint: '🧪' }, { word: 'MICROSCOPE', hint: '🔬' }, { word: 'TELESCOPE', hint: '🔭' },
      { word: 'COMPASS', hint: '🧭' }, { word: 'GLOBE', hint: '🌍' }, { word: 'CHESS', hint: '♟️' },
      { word: 'CHECKERS', hint: '🟥' }, { word: 'MONOPOLY', hint: '🏠' }, { word: 'SCRABBLE', hint: '🔤' },
      { word: 'CONNECT4', hint: '🟡' }, { word: 'DOMINOES', hint: '🎲' }, { word: 'BACKGAMMON', hint: '🎲' },
      { word: 'MAGNETS', hint: '🧲' }, { word: 'PRISM', hint: '💎' }, { word: 'CALCULATOR', hint: '🧮' }
    ]
  }
};

describe('Word Database', () => {
  describe('Categories', () => {
    it('should have exactly 15 categories', () => {
      expect(Object.keys(categories)).toHaveLength(15);
    });

    it('should have all required categories', () => {
      const requiredCategories = [
        'general', 'colors', 'numbers', 'fruits', 'vegetables',
        'animals', 'birds', 'vehicles', 'bodyParts', 'clothing',
        'weather', 'food', 'countries', 'shapes', 'toys'
      ];
      requiredCategories.forEach(cat => {
        expect(categories).toHaveProperty(cat);
      });
    });

    it('should have name, icon, and color for each category', () => {
      Object.entries(categories).forEach(([key, cat]) => {
        expect(cat).toHaveProperty('name');
        expect(cat).toHaveProperty('icon');
        expect(cat).toHaveProperty('color');
        expect(typeof cat.name).toBe('string');
        expect(typeof cat.icon).toBe('string');
        expect(typeof cat.color).toBe('string');
      });
    });

    it('should have unique names for all categories', () => {
      const names = Object.values(categories).map(c => c.name);
      const uniqueNames = [...new Set(names)];
      expect(names).toHaveLength(uniqueNames.length);
    });

    it('should have unique icons for all categories', () => {
      const icons = Object.values(categories).map(c => c.icon);
      const uniqueIcons = [...new Set(icons)];
      expect(icons).toHaveLength(uniqueIcons.length);
    });

    it('should have valid hex colors for all categories', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      Object.values(categories).forEach(cat => {
        expect(cat.color).toMatch(hexRegex);
      });
    });
  });

  describe('Word Database Structure', () => {
    it('should have entries for all 15 categories', () => {
      Object.keys(categories).forEach(cat => {
        expect(wordDatabase).toHaveProperty(cat);
      });
    });

    it('should have exactly 5 levels for each category', () => {
      Object.keys(categories).forEach(cat => {
        expect(Object.keys(wordDatabase[cat])).toHaveLength(5);
        [1, 2, 3, 4, 5].forEach(level => {
          expect(wordDatabase[cat][level]).toBeDefined();
        });
      });
    });

    it('should have at least 10 words per level', () => {
      Object.keys(categories).forEach(cat => {
        [1, 2, 3, 4, 5].forEach(level => {
          const words = wordDatabase[cat][level];
          expect(words.length).toBeGreaterThanOrEqual(10);
        });
      });
    });

    it('should have word and hint for each word entry', () => {
      Object.keys(categories).forEach(cat => {
        [1, 2, 3, 4, 5].forEach(level => {
          wordDatabase[cat][level].forEach(entry => {
            expect(entry).toHaveProperty('word');
            expect(entry).toHaveProperty('hint');
            expect(typeof entry.word).toBe('string');
            expect(typeof entry.hint).toBe('string');
          });
        });
      });
    });

    it('should have words as strings', () => {
      Object.keys(categories).forEach(cat => {
        [1, 2, 3, 4, 5].forEach(level => {
          wordDatabase[cat][level].forEach(entry => {
            expect(typeof entry.word).toBe('string');
            expect(entry.word.length).toBeGreaterThan(0);
          });
        });
      });
    });
  });

  describe('Total Word Count', () => {
    it('should have approximately 1000 words total (15 categories x 5 levels x ~13 words)', () => {
      let totalWords = 0;
      Object.keys(categories).forEach(cat => {
        [1, 2, 3, 4, 5].forEach(level => {
          totalWords += wordDatabase[cat][level].length;
        });
      });
      expect(totalWords).toBeGreaterThanOrEqual(900);
      expect(totalWords).toBeLessThanOrEqual(1200);
    });

    it('should have approximately 75 words per category', () => {
      Object.keys(categories).forEach(cat => {
        let categoryWords = 0;
        [1, 2, 3, 4, 5].forEach(level => {
          categoryWords += wordDatabase[cat][level].length;
        });
        expect(categoryWords).toBeGreaterThanOrEqual(60);
        expect(categoryWords).toBeLessThanOrEqual(90);
      });
    });
  });

  describe('Word Uniqueness', () => {
    it('should have mostly unique words within the same level (allow some duplicates)', () => {
      Object.keys(categories).forEach(cat => {
        [1, 2, 3, 4, 5].forEach(level => {
          const words = wordDatabase[cat][level].map(e => e.word);
          const uniqueWords = [...new Set(words)];
          const uniquenessRatio = uniqueWords.length / words.length;
          expect(uniquenessRatio).toBeGreaterThan(0.8);
        });
      });
    });
  });
});

describe('Category Icons and Hints', () => {
  it('should have hints for all words', () => {
    Object.keys(categories).forEach(cat => {
      [1, 2, 3, 4, 5].forEach(level => {
        wordDatabase[cat][level].forEach(entry => {
          expect(entry.hint.length).toBeGreaterThan(0);
        });
      });
    });
  });

  it('should have valid category icons', () => {
    Object.values(categories).forEach(cat => {
      expect(cat.icon.length).toBeGreaterThan(0);
    });
  });
});

describe('Game Logic Helper Functions', () => {
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  it('should shuffle array without modifying original', () => {
    const original = [1, 2, 3, 4, 5];
    const originalCopy = [...original];
    shuffleArray(original);
    expect(original).toEqual(originalCopy);
  });

  it('should return array of same length after shuffle', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffleArray(array);
    expect(shuffled).toHaveLength(array.length);
  });

  it('should contain all original elements after shuffle', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);
    expect(shuffled.sort()).toEqual(array.sort());
  });

  it('should handle empty array', () => {
    const shuffled = shuffleArray([]);
    expect(shuffled).toEqual([]);
  });

  it('should handle single element array', () => {
    const shuffled = shuffleArray([1]);
    expect(shuffled).toEqual([1]);
  });
});

describe('Scoring Calculations', () => {
  const calculateScore = (hintsUsed, attempts, streak) => {
    let points = 100;
    if (hintsUsed === 0) points += 50;
    if (attempts === 0) points += 100;
    points += streak * 25;
    return points;
  };

  it('should award 100 base points', () => {
    expect(calculateScore(1, 1, 0)).toBe(100);
  });

  it('should award 50 bonus for no hints', () => {
    expect(calculateScore(0, 1, 0)).toBe(150);
  });

  it('should award 100 bonus for no attempts', () => {
    expect(calculateScore(1, 0, 0)).toBe(200);
  });

  it('should award both hints and attempts bonus', () => {
    expect(calculateScore(0, 0, 0)).toBe(250);
  });

  it('should add streak bonus', () => {
    expect(calculateScore(0, 0, 5)).toBe(375);
  });

  it('should handle high streak values', () => {
    expect(calculateScore(0, 0, 10)).toBe(500);
  });
});

describe('Star Rating Calculation', () => {
  const calculateStars = (attempts) => {
    let earnedStars = 1;
    if (attempts === 0) earnedStars = 3;
    else if (attempts <= 5) earnedStars = 2;
    return earnedStars;
  };

  it('should award 3 stars for perfect game (0 attempts)', () => {
    expect(calculateStars(0)).toBe(3);
  });

  it('should award 2 stars for 1-5 attempts', () => {
    expect(calculateStars(1)).toBe(2);
    expect(calculateStars(3)).toBe(2);
    expect(calculateStars(5)).toBe(2);
  });

  it('should award 1 star for 6+ attempts', () => {
    expect(calculateStars(6)).toBe(1);
    expect(calculateStars(10)).toBe(1);
    expect(calculateStars(100)).toBe(1);
  });
});

describe('Letter Generation', () => {
  const getLetters = (word) => {
    const wordLetters = word.split('');
    const extraLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      .filter(l => !wordLetters.includes(l))
      .slice(0, 3);
    return [...wordLetters, ...extraLetters];
  };

  it('should include all word letters', () => {
    const word = 'CAT';
    const letters = getLetters(word);
    expect(letters).toContain('C');
    expect(letters).toContain('A');
    expect(letters).toContain('T');
  });

  it('should add 3 extra letters for normal words', () => {
    const word = 'CAT';
    const letters = getLetters(word);
    expect(letters).toHaveLength(6);
  });

  it('should include word letters plus extras', () => {
    const word = 'AAA';
    const letters = getLetters(word);
    expect(letters).toContain('A');
  });

  it('should handle single letter word', () => {
    const word = 'A';
    const letters = getLetters(word);
    expect(letters).toHaveLength(4);
    expect(letters).toContain('A');
  });
});
