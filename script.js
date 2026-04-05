// Word Wizard Game Logic

// Word Database organized by level
const wordDatabase = {
    1: [
        { word: 'CAT', hint: '🐱' },
        { word: 'DOG', hint: '🐕' },
        { word: 'SUN', hint: '☀️' },
        { word: 'HAT', hint: '🎩' },
        { word: 'CUP', hint: '☕' }
    ],
    2: [
        { word: 'FISH', hint: '🐟' },
        { word: 'BIRD', hint: '🐦' },
        { word: 'TREE', hint: '🌳' },
        { word: 'BOOK', hint: '📚' },
        { word: 'STAR', hint: '⭐' }
    ],
    3: [
        { word: 'APPLE', hint: '🍎' },
        { word: 'TIGER', hint: '🐯' },
        { word: 'HAPPY', hint: '😊' },
        { word: 'CANDY', hint: '🍬' },
        { word: 'MUSIC', hint: '🎵' }
    ],
    4: [
        { word: 'BANANA', hint: '🍌' },
        { word: 'DRAGON', hint: '🐉' },
        { word: 'FLOWER', hint: '🌸' },
        { word: 'ROCKET', hint: '🚀' },
        { word: 'PLANET', hint: '🪐' }
    ],
    5: [
        { word: 'PENGUIN', hint: '🐧' },
        { word: 'ELEPHANT', hint: '🐘' },
        { word: 'UMBRELLA', hint: '☂️' },
        { word: 'RAINBOW', hint: '🌈' },
        { word: 'BUTTERFLY', hint: '🦋' }
    ]
};

// Game State
const gameState = {
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
    confettiContainer: document.getElementById('confetti-container')
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
}

// Start game
function startGame() {
    playSound('click');
    gameState.gameStarted = true;
    elements.startModal.classList.remove('show');
    
    // Reset for new game
    gameState.currentLevel = 1;
    gameState.currentWordIndex = 0;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.wordsCompleted = 0;
    gameState.selectedTile = null;
    
    prepareLevel();
}

// Prepare level
function prepareLevel() {
    // Shuffle words for this level
    gameState.shuffledWords = shuffleArray([...wordDatabase[gameState.currentLevel]]);
    gameState.currentWordIndex = 0;
    gameState.levelWordsCompleted = 0;
    gameState.maxAttempts = wordDatabase[gameState.currentLevel].length;
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
    
    // Update display
    elements.hintEmoji.textContent = wordData.hint;
    elements.hintText.textContent = 'Guess the word!';
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
    
    elements.modalScore.textContent = gameState.score;
    elements.modalLevel.textContent = gameState.currentLevel;
    
    // Show stars
    const starElements = elements.starsDisplay.querySelectorAll('.star');
    starElements.forEach((star, i) => {
        star.classList.remove('earned');
        if (i < stars) {
            setTimeout(() => star.classList.add('earned'), 300 * (i + 1));
        }
    });
    
    if (gameState.currentLevel >= 5) {
        // Game complete
        showGameComplete();
    } else {
        elements.levelModal.classList.add('show');
    }
}

// Calculate stars based on performance
function calculateStars() {
    const totalAttempts = gameState.attempts;
    const levelSize = wordDatabase[gameState.currentLevel].length;
    
    if (totalAttempts === 0) return 3;
    if (totalAttempts <= levelSize) return 2;
    return 1;
}

// Show game complete modal
function showGameComplete() {
    elements.finalScore.textContent = gameState.score;
    elements.bestStreak.textContent = gameState.bestStreak;
    elements.wordsLearned.textContent = gameState.wordsCompleted;
    
    elements.gameCompleteModal.classList.add('show');
    createConfetti();
}

// Next level
function nextLevel() {
    playSound('click');
    elements.levelModal.classList.remove('show');
    elements.streakContainer.classList.remove('hot');
    
    gameState.currentLevel++;
    prepareLevel();
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
    
    prepareLevel();
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
