import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

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
      { word: 'TEN', hint: '🔟' }, { word: 'NIL', hint: '0️⃣' }, { word: 'ADD', hint: '➕' },
      { word: 'SUM', hint: '➕' }, { word: 'ODD', hint: '🔢' }, { word: 'PAIR', hint: '2️⃣' },
      { word: 'BIG', hint: '🔢' }, { word: 'TINY', hint: '🔢' }, { word: 'LOT', hint: '🔢' },
      { word: 'FEW', hint: '🔢' }, { word: 'NUL', hint: '0️⃣' }, { word: 'EVEN', hint: '🔢' }
    ],
    2: [
      { word: 'FOUR', hint: '4️⃣' }, { word: 'FIVE', hint: '5️⃣' }, { word: 'NINE', hint: '9️⃣' },
      { word: 'ZERO', hint: '0️⃣' }, { word: 'HALF', hint: '½' }, { word: 'DOZEN', hint: '📦' },
      { word: 'SCORE', hint: '🏆' }, { word: 'TOTAL', hint: '📊' }, { word: 'COUNT', hint: '🔢' },
      { word: 'PLUS', hint: '➕' }, { word: 'MINUS', hint: '➖' }, { word: 'EQUAL', hint: '🟰' },
      { word: 'TENS', hint: '🔟' }, { word: 'GROSS', hint: '📦' }, { word: 'QUARTER', hint: '¼' }
    ],
    3: [
      { word: 'THREE', hint: '3️⃣' }, { word: 'SEVEN', hint: '7️⃣' }, { word: 'EIGHT', hint: '8️⃣' },
      { word: 'TWENTY', hint: '2️⃣0️⃣' }, { word: 'THIRTY', hint: '3️⃣0️⃣' }, { word: 'FORTY', hint: '4️⃣0️⃣' },
      { word: 'FIFTY', hint: '5️⃣0️⃣' }, { word: 'SIXTY', hint: '6️⃣0️⃣' }, { word: 'HUNDRED', hint: '💯' },
      { word: 'FRACTION', hint: '½' }, { word: 'DECIMAL', hint: '🔢' }, { word: 'INTEGER', hint: '🔢' },
      { word: 'MILLION', hint: '🔢' }, { word: 'BILLION', hint: '🔢' }, { word: 'THOUSAND', hint: '🔢' }
    ],
    4: [
      { word: 'ELEVEN', hint: '1️⃣1️⃣' }, { word: 'TWELVE', hint: '1️⃣2️⃣' }, { word: 'THIRTEEN', hint: '1️⃣3️⃣' },
      { word: 'FOURTEEN', hint: '1️⃣4️⃣' }, { word: 'FIFTEEN', hint: '1️⃣5️⃣' }, { word: 'SIXTEEN', hint: '1️⃣6️⃣' },
      { word: 'SEVENTEEN', hint: '1️⃣7️⃣' }, { word: 'EIGHTEEN', hint: '1️⃣8️⃣' }, { word: 'NINETEEN', hint: '1️⃣9️⃣' },
      { word: 'TWENTY', hint: '2️⃣0️⃣' }, { word: 'FORTY', hint: '4️⃣0️⃣' }, { word: 'FIFTY', hint: '5️⃣0️⃣' },
      { word: 'SIXTY', hint: '6️⃣0️⃣' }, { word: 'SEVENTY', hint: '7️⃣0️⃣' }, { word: 'EIGHTY', hint: '8️⃣0️⃣' }
    ],
    5: [
      { word: 'NINETY', hint: '9️⃣0️⃣' }, { word: 'HUNDRED', hint: '💯' }, { word: 'THOUSAND', hint: '🔢' },
      { word: 'MILLION', hint: '🔢' }, { word: 'BILLION', hint: '🔢' }, { word: 'TRILLION', hint: '🔢' },
      { word: 'FRACTION', hint: '½' }, { word: 'DECIMAL', hint: '🔢' }, { word: 'INTEGER', hint: '🔢' },
      { word: 'PERCENT', hint: '%' }, { word: 'NUMBER', hint: '🔢' }, { word: 'DIGIT', hint: '🔢' },
      { word: 'COUNT', hint: '🔢' }, { word: 'QUARTER', hint: '¼' }, { word: 'HALVES', hint: '½' }
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
      { word: 'PAPAYA', hint: '🥭' }, { word: 'AVOCADO', hint: '🥑' }, { word: 'COCONUT', hint: '🥥' },
      { word: 'LYCHEE', hint: '🍈' }, { word: 'DURIAN', hint: '🍈' }, { word: 'APRICOT', hint: '🍑' },
      { word: 'POMELO', hint: '🍊' }, { word: 'RAISIN', hint: '🍇' }, { word: 'PRUNE', hint: '🟣' },
      { word: 'QUINCE', hint: '🍈' }, { word: 'CURRANT', hint: '🫐' }, { word: 'MELON', hint: '🍈' }
    ],
    4: [
      { word: 'ORANGE', hint: '🍊' }, { word: 'BANANA', hint: '🍌' }, { word: 'CHERRY', hint: '🍒' },
      { word: 'PAPAYA', hint: '🥭' }, { word: 'AVOCADO', hint: '🥑' }, { word: 'COCONUT', hint: '🥥' },
      { word: 'LYCHEE', hint: '🍈' }, { word: 'DURIAN', hint: '🍈' }, { word: 'APRICOT', hint: '🍑' },
      { word: 'POMELO', hint: '🍊' }, { word: 'RAISIN', hint: '🍇' }, { word: 'PRUNE', hint: '🟣' },
      { word: 'TANGERINE', hint: '🍊' }, { word: 'CURRANT', hint: '🫐' }, { word: 'QUINCE', hint: '🍈' }
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
      { word: 'YAM', hint: '🍠' }, { word: 'CORN', hint: '🌽' }, { word: 'KALE', hint: '🥬' },
      { word: 'BEET', hint: '🟣' }, { word: 'OKRA', hint: '🟢' }, { word: 'LEEK', hint: '🟢' }
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
      { word: 'AUTUMN', hint: '🍂' }, { word: 'SPRING', hint: '🌸' }, { word: 'WINTER', hint: '❄️' }
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

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  const [gameState, setGameState] = useState({
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
    soundEnabled: true,
    gameStarted: false,
    shuffledWords: []
  });

  const [filledSlots, setFilledSlots] = useState([]);
  const [usedTiles, setUsedTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [showStartModal, setShowStartModal] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [showGameComplete, setShowGameComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [wrongSlot, setWrongSlot] = useState(null);

  const bounceAnim = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef([]);

  useEffect(() => {
    if (gameState.gameStarted) {
      prepareLevel();
    }
  }, [gameState.gameStarted]);

  const prepareLevel = () => {
    const catWords = wordDatabase[gameState.currentCategory][gameState.currentLevel];
    const shuffled = shuffleArray([...catWords]);
    setGameState(prev => ({
      ...prev,
      shuffledWords: shuffled,
      currentWordIndex: 0,
      levelWordsCompleted: 0,
      currentWord: shuffled[0].word,
      hintsUsed: 0,
      attempts: 0
    }));
    setFilledSlots(Array(shuffled[0].word.length).fill(null));
    setUsedTiles([]);
    setFeedback({ text: '', type: '' });
  };

  const getCurrentHint = () => {
    if (gameState.shuffledWords.length > 0 && gameState.currentWordIndex < gameState.shuffledWords.length) {
      return gameState.shuffledWords[gameState.currentWordIndex].hint;
    }
    return '❓';
  };

  const getLetters = () => {
    if (!gameState.currentWord) return [];
    const wordLetters = gameState.currentWord.split('');
    const extraLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      .filter(l => !wordLetters.includes(l))
      .slice(0, 3);
    return shuffleArray([...wordLetters, ...extraLetters]);
  };

  const handleSlotPress = (index) => {
    if (filledSlots[index]) return;
    
    if (selectedTile) {
      const correctLetter = gameState.currentWord[index];
      if (selectedTile === correctLetter) {
        setFilledSlots(prev => {
          const newSlots = [...prev];
          newSlots[index] = selectedTile;
          return newSlots;
        });
        setUsedTiles(prev => [...prev, selectedTile]);
        setSelectedTile(null);
        checkWord();
      } else {
        setWrongSlot(index);
        setTimeout(() => setWrongSlot(null), 500);
        setGameState(prev => ({ ...prev, attempts: prev.attempts + 1, streak: 0 }));
        setFeedback({ text: 'Try again!', type: 'error' });
      }
    }
  };

  const handleTilePress = (letter) => {
    if (usedTiles.includes(letter)) return;
    
    if (selectedTile === letter) {
      setSelectedTile(null);
    } else {
      setSelectedTile(letter);
    }
  };

  const checkWord = () => {
    const currentFilled = filledSlots.filter(s => s !== null);
    if (currentFilled.length === gameState.currentWord.length) {
      handleCorrectWord();
    }
  };

  const handleCorrectWord = () => {
    let points = 100;
    if (gameState.hintsUsed === 0) points += 50;
    if (gameState.attempts === 0) points += 100;
    points += gameState.streak * 25;

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      streak: prev.streak + 1,
      wordsCompleted: prev.wordsCompleted + 1,
      levelWordsCompleted: prev.levelWordsCompleted + 1,
      bestStreak: Math.max(prev.bestStreak, prev.streak + 1)
    }));

    setFeedback({ text: `+${points} points!`, type: 'success' });
    triggerConfetti();

    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(bounceAnim, { toValue: 0, duration: 200, useNativeDriver: true })
    ]).start();

    setTimeout(() => {
      const nextIndex = gameState.currentWordIndex + 1;
      if (nextIndex >= gameState.shuffledWords.length) {
        showLevelComplete();
      } else {
        loadNextWord(nextIndex);
      }
    }, 1500);
  };

  const loadNextWord = (index) => {
    const word = gameState.shuffledWords[index].word;
    setGameState(prev => ({
      ...prev,
      currentWordIndex: index,
      currentWord: word,
      hintsUsed: 0,
      attempts: 0
    }));
    setFilledSlots(Array(word.length).fill(null));
    setUsedTiles([]);
    setFeedback({ text: '', type: '' });
  };

  const showLevelComplete = () => {
    const totalAttempts = gameState.attempts;
    let earnedStars = 1;
    if (totalAttempts === 0) earnedStars = 3;
    else if (totalAttempts <= 5) earnedStars = 2;
    setStars(earnedStars);

    if (gameState.currentLevel >= 5) {
      setShowGameComplete(true);
    } else {
      setShowLevelModal(true);
    }
  };

  const handleNextLevel = () => {
    setShowLevelModal(false);
    const nextLevel = gameState.currentLevel + 1;
    if (nextLevel > 5) {
      setShowGameComplete(true);
    } else {
      setGameState(prev => ({ ...prev, currentLevel: nextLevel }));
      prepareLevel();
    }
  };

  const handleHint = () => {
    if (gameState.hintsUsed >= 2) return;
    
    const emptyIndex = filledSlots.findIndex((slot, idx) => slot === null);
    if (emptyIndex === -1) return;

    const correctLetter = gameState.currentWord[emptyIndex];
    const allLetters = getLetters();
    
    allLetters.forEach(letter => {
      if (letter !== correctLetter && !usedTiles.includes(letter)) {
        setUsedTiles(prev => [...prev, letter]);
      }
    });

    setGameState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
  };

  const handleSkip = () => {
    const nextIndex = (gameState.currentWordIndex + 1) % gameState.shuffledWords.length;
    setGameState(prev => ({ ...prev, streak: 0 }));
    loadNextWord(nextIndex);
  };

  const handleReset = () => {
    setFilledSlots(Array(gameState.currentWord.length).fill(null));
    setUsedTiles([]);
    setGameState(prev => ({ ...prev, attempts: prev.attempts + 1, hintsUsed: 0 }));
    setFeedback({ text: '', type: '' });
  };

  const triggerConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#6366f1'];
    const pieces = [];
    for (let i = 0; i < 30; i++) {
      pieces.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5
      });
    }
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3000);
  };

  const startGame = () => {
    setShowStartModal(false);
    setShowCategoryModal(true);
  };

  const selectCategory = (categoryKey) => {
    setShowCategoryModal(false);
    setGameState(prev => ({
      ...prev,
      currentCategory: categoryKey,
      gameStarted: true,
      currentLevel: 1,
      currentWordIndex: 0,
      score: 0,
      streak: 0,
      wordsCompleted: 0,
      bestStreak: 0,
      hintsUsed: 0
    }));
  };

  const playAgain = () => {
    setShowGameComplete(false);
    setShowCategoryModal(true);
  };

  const progress = gameState.shuffledWords.length > 0 
    ? (gameState.currentWordIndex / gameState.shuffledWords.length) * 100 
    : 0;

  const scale = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔤 Word Wizard ✨</Text>
        <Text style={styles.tagline}>
          {gameState.gameStarted 
            ? `${categories[gameState.currentCategory].icon} ${categories[gameState.currentCategory].name}`
            : 'Spell, Learn, Win!'}
        </Text>
      </View>

      <View style={styles.scoreBar}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreIcon}>⭐</Text>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{gameState.score}</Text>
        </View>
        <View style={[styles.scoreItem, gameState.streak >= 3 && styles.streakHot]}>
          <Text style={styles.scoreIcon}>🔥</Text>
          <Text style={styles.scoreLabel}>Streak</Text>
          <Text style={styles.scoreValue}>{gameState.streak}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreIcon}>🏆</Text>
          <Text style={styles.scoreLabel}>Level</Text>
          <Text style={styles.scoreValue}>{gameState.currentLevel}/5</Text>
        </View>
      </View>

      <View style={styles.gameCard}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Word {gameState.currentWordIndex + 1} of {gameState.shuffledWords.length || 5}
          </Text>
        </View>

        <View style={styles.wordArea}>
          <Text style={styles.hintEmoji}>{getCurrentHint()}</Text>
          <Text style={styles.hintText}>
            {filledSlots.every(s => s !== null) ? gameState.currentWord : 'Guess the word!'}
          </Text>

          <View style={styles.wordSlots}>
            {gameState.currentWord && gameState.currentWord.split('').map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.wordSlot,
                  filledSlots[index] && styles.wordSlotFilled,
                  filledSlots[index] && styles.wordSlotCorrect,
                  wrongSlot === index && styles.wordSlotWrong
                ]}
                onPress={() => handleSlotPress(index)}
              >
                <Text style={styles.slotText}>{filledSlots[index] || ''}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[
            styles.feedback,
            feedback.type === 'success' && styles.feedbackSuccess,
            feedback.type === 'error' && styles.feedbackError
          ]}>
            {feedback.text}
          </Text>
        </View>

        <View style={styles.letterBank}>
          {getLetters().map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.letterTile,
                usedTiles.includes(letter) && styles.letterTileUsed,
                selectedTile === letter && styles.letterTileSelected
              ]}
              onPress={() => handleTilePress(letter)}
              disabled={usedTiles.includes(letter)}
            >
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.hintBtn} onPress={handleHint}>
            <Text style={styles.btnText}>💡 Hint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.btnText}>⏭️ Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.btnText}>🔄 Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {confetti.map(piece => (
        <Animated.View
          key={piece.id}
          style={[
            styles.confetti,
            {
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              top: -20
            }
          ]}
        />
      ))}

      {showStartModal && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>🔤</Text>
            <Text style={styles.modalTitle}>Word Wizard</Text>
            <Text style={styles.modalSubtitle}>Learn to spell with fun!</Text>
            <View style={styles.howToPlay}>
              <Text style={styles.howToTitle}>How to Play</Text>
              <Text style={styles.howToItem}>👆 Tap letters to fill slots</Text>
              <Text style={styles.howToItem}>🐱 Match the emoji hint</Text>
              <Text style={styles.howToItem}>💡 Use hints if stuck</Text>
              <Text style={styles.howToItem}>🔥 Build streaks for bonus!</Text>
            </View>
            <TouchableOpacity style={styles.playBtn} onPress={startGame}>
              <Text style={styles.playBtnText}>Start Game 🎮</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showCategoryModal && (
        <View style={styles.modal}>
          <View style={[styles.modalContent, styles.categoryModalContent]}>
            <TouchableOpacity style={styles.categoryBackBtn} onPress={() => setShowCategoryModal(false)}>
              <Text style={styles.categoryBackBtnText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalIcon}>📚</Text>
            <Text style={styles.modalTitle}>Choose a Category</Text>
            <ScrollView style={styles.categoryScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.categoryGrid}>
                {[0, 1, 2, 3, 4].map(rowIndex => {
                  const rowCategories = Object.entries(categories).slice(rowIndex * 3, rowIndex * 3 + 3);
                  if (rowCategories.length === 0) return null;
                  return (
                    <View key={rowIndex} style={styles.categoryRow}>
                      {rowCategories.map(([key, cat]) => (
                        <TouchableOpacity
                          key={key}
                          style={[styles.categoryCard, { backgroundColor: cat.color }]}
                          onPress={() => selectCategory(key)}
                        >
                          <Text style={styles.categoryIcon}>{cat.icon}</Text>
                          <Text style={styles.categoryName}>{cat.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {showLevelModal && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>🎉</Text>
            <Text style={styles.modalTitle}>Level Complete!</Text>
            <View style={styles.levelStats}>
              <View style={styles.stat}>
                <Text style={styles.statIcon}>⭐</Text>
                <Text style={styles.statValue}>{gameState.score}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statIcon}>🏆</Text>
                <Text style={styles.statValue}>{gameState.currentLevel}</Text>
              </View>
            </View>
            <View style={styles.starsDisplay}>
              {[1, 2, 3].map(i => (
                <Text key={i} style={[styles.star, i <= stars && styles.starEarned]}>
                  ⭐
                </Text>
              ))}
            </View>
            <TouchableOpacity style={styles.playBtn} onPress={handleNextLevel}>
              <Text style={styles.playBtnText}>Next Level →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showGameComplete && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>🏆</Text>
            <Text style={styles.modalTitle}>Category Complete!</Text>
            <Text style={styles.modalSubtitle}>{categories[gameState.currentCategory].icon} {categories[gameState.currentCategory].name}</Text>
            <View style={styles.finalStats}>
              <View style={styles.finalStat}>
                <Text style={styles.finalLabel}>Final Score</Text>
                <Text style={styles.finalValue}>{gameState.score}</Text>
              </View>
              <View style={styles.finalStat}>
                <Text style={styles.finalLabel}>Best Streak</Text>
                <Text style={styles.finalValue}>{gameState.bestStreak}</Text>
              </View>
              <View style={styles.finalStat}>
                <Text style={styles.finalLabel}>Words Learned</Text>
                <Text style={styles.finalValue}>{gameState.wordsCompleted}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playBtn} onPress={playAgain}>
              <Text style={styles.playBtnText}>Choose Category 🔄</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity 
        style={styles.soundToggle}
        onPress={() => setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
      >
        <Text>{gameState.soundEnabled ? '🔊' : '🔇'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreIcon: {
    fontSize: 24,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    textTransform: 'uppercase',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  streakHot: {
    backgroundColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 10,
    padding: 5,
  },
  gameCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 25,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  wordArea: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  hintEmoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  hintText: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 20,
    fontWeight: '600',
  },
  wordSlots: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
    minHeight: 70,
  },
  wordSlot: {
    width: 50,
    height: 60,
    backgroundColor: '#f3f4f6',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordSlotFilled: {
    borderStyle: 'solid',
    borderColor: '#6366f1',
    backgroundColor: '#fff',
  },
  wordSlotCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#d1fae5',
  },
  wordSlotWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
  },
  slotText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  feedback: {
    fontSize: 16,
    fontWeight: 'bold',
    minHeight: 30,
  },
  feedbackSuccess: {
    color: '#10b981',
  },
  feedbackError: {
    color: '#ef4444',
  },
  letterBank: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    marginBottom: 20,
    minHeight: 100,
  },
  letterTile: {
    width: 45,
    height: 50,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterTileUsed: {
    opacity: 0.3,
  },
  letterTileSelected: {
    borderColor: '#f97316',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  letterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  hintBtn: {
    backgroundColor: '#fbbf24',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  skipBtn: {
    backgroundColor: '#9ca3af',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  resetBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  modalIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 25,
  },
  levelStats: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  starsDisplay: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },
  star: {
    fontSize: 36,
    opacity: 0.2,
  },
  starEarned: {
    opacity: 1,
  },
  howToPlay: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    width: '100%',
  },
  howToTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 15,
    textAlign: 'center',
  },
  howToItem: {
    fontSize: 14,
    color: '#4b5563',
    paddingVertical: 5,
    fontWeight: '600',
  },
  playBtn: {
    backgroundColor: '#6366f1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  playBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalStats: {
    width: '100%',
    marginBottom: 25,
  },
  finalStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 15,
    marginBottom: 10,
  },
  finalLabel: {
    fontWeight: '600',
    color: '#6b7280',
  },
  finalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  soundToggle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confetti: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  categoryModalContent: {
    maxHeight: '85%',
    paddingVertical: 20,
  },
  categoryScrollView: {
    width: '100%',
    maxHeight: 400,
  },
  categoryGrid: {
    flexDirection: 'column',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  categoryBackBtn: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
  },
  categoryBackBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryCard: {
    width: 95,
    height: 95,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
