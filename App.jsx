import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

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
    const shuffled = shuffleArray([...wordDatabase[gameState.currentLevel]]);
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
    setGameState(prev => ({ ...prev, currentLevel: prev.currentLevel + 1 }));
    prepareLevel();
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
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      currentLevel: 1,
      currentWordIndex: 0,
      score: 0,
      streak: 0,
      wordsCompleted: 0
    }));
  };

  const playAgain = () => {
    setShowGameComplete(false);
    setGameState(prev => ({
      ...prev,
      currentLevel: 1,
      currentWordIndex: 0,
      score: 0,
      streak: 0,
      wordsCompleted: 0
    }));
    prepareLevel();
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
        <Text style={styles.tagline}>Spell, Learn, Win!</Text>
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
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalSubtitle}>You've mastered all the words!</Text>
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
              <Text style={styles.playBtnText}>Play Again 🔄</Text>
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
});
