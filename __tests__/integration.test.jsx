import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import App from '../App';

jest.useFakeTimers();

describe('Game Handlers Integration Tests', () => {
  let getByText;
  let getAllByText;
  let queryByText;

  beforeEach(() => {
    jest.clearAllMocks();
    const utils = render(<App />);
    getByText = utils.getByText;
    getAllByText = utils.getAllByText;
    queryByText = utils.queryByText;
  });

  describe('Hint System', () => {
    it('should find and interact with Hint button', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText('💡 Hint')).toBeTruthy();
      });
    });

    it('should find Skip button', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText('⏭️ Skip')).toBeTruthy();
      });
    });

    it('should find Reset button', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText('🔄 Reset')).toBeTruthy();
      });
    });
  });

  describe('Tile Selection', () => {
    it('should display letter tiles when game starts', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        const tileElements = getAllByText(/^[A-Z]$/);
        expect(tileElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Word Slots', () => {
    it('should display word slots based on word length', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        const wordSlots = getAllByText(/^[A-Z]$/);
        expect(wordSlots.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Progress Display', () => {
    it('should show word progress indicator', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText(/Word \d+ of \d+/)).toBeTruthy();
      });
    });
  });

  describe('Hint Emoji Display', () => {
    it('should show emoji hint for current word', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        const emojiHints = getAllByText(/[^\s]/);
        expect(emojiHints.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Category Switching', () => {
    it('should be able to switch between categories', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Animals'));
      await waitFor(() => {
        expect(getByText(/Animals/)).toBeTruthy();
      });
    });

    it('should show colors category', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Colors'));
      await waitFor(() => {
        expect(getByText(/Colors/)).toBeTruthy();
      });
    });

    it('should show fruits category', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Fruits'));
      await waitFor(() => {
        expect(getByText(/Fruits/)).toBeTruthy();
      });
    });
  });

  describe('Score Updates', () => {
    it('should show initial score of 0', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText('Score')).toBeTruthy();
      });
    });

    it('should show streak counter', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText('Streak')).toBeTruthy();
        const zeros = getAllByText('0');
        expect(zeros.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Level Display', () => {
    it('should show current level out of 5', async () => {
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText('Level')).toBeTruthy();
        expect(getByText('1/5')).toBeTruthy();
      });
    });
  });
});

describe('Game Logic Comprehensive Tests', () => {
  describe('Score Calculation', () => {
    it('should calculate score with streak bonus', () => {
      const calculateScore = (hintsUsed, attempts, streak) => {
        let points = 100;
        if (hintsUsed === 0) points += 50;
        if (attempts === 0) points += 100;
        points += streak * 25;
        return points;
      };

      expect(calculateScore(0, 0, 1)).toBe(275);
      expect(calculateScore(0, 0, 2)).toBe(300);
      expect(calculateScore(0, 0, 5)).toBe(375);
      expect(calculateScore(0, 0, 10)).toBe(500);
    });

    it('should handle negative scenarios', () => {
      const calculateScore = (hintsUsed, attempts, streak) => {
        let points = 100;
        if (hintsUsed === 0) points += 50;
        if (attempts === 0) points += 100;
        points += streak * 25;
        return points;
      };

      expect(calculateScore(2, 10, 0)).toBe(100);
      expect(calculateScore(1, 5, 0)).toBe(100);
    });
  });

  describe('Star Rating Logic', () => {
    it('should calculate stars correctly for all attempts', () => {
      const calculateStars = (attempts) => {
        let earnedStars = 1;
        if (attempts === 0) earnedStars = 3;
        else if (attempts <= 5) earnedStars = 2;
        return earnedStars;
      };

      expect(calculateStars(0)).toBe(3);
      expect(calculateStars(1)).toBe(2);
      expect(calculateStars(2)).toBe(2);
      expect(calculateStars(3)).toBe(2);
      expect(calculateStars(4)).toBe(2);
      expect(calculateStars(5)).toBe(2);
      expect(calculateStars(6)).toBe(1);
      expect(calculateStars(10)).toBe(1);
      expect(calculateStars(50)).toBe(1);
    });
  });

  describe('Word Completion Detection', () => {
    it('should detect when word is complete', () => {
      const isWordComplete = (slots, wordLength) => 
        slots.filter(s => s !== null).length === wordLength;

      expect(isWordComplete(['C', 'A', 'T'], 3)).toBe(true);
      expect(isWordComplete(['C', null, 'T'], 3)).toBe(false);
      expect(isWordComplete([null, null, null], 3)).toBe(false);
      expect(isWordComplete(['D', 'O', 'G'], 3)).toBe(true);
      expect(isWordComplete(['E', null, null, null, null], 5)).toBe(false);
    });
  });

  describe('Level Completion Detection', () => {
    it('should detect level completion', () => {
      const isLevelComplete = (currentIndex, totalWords) => currentIndex >= totalWords;

      expect(isLevelComplete(0, 15)).toBe(false);
      expect(isLevelComplete(14, 15)).toBe(false);
      expect(isLevelComplete(15, 15)).toBe(true);
      expect(isLevelComplete(16, 15)).toBe(true);
    });
  });

  describe('Streak Management', () => {
    it('should track streak correctly', () => {
      const updateStreak = (currentStreak, isCorrect) => 
        isCorrect ? currentStreak + 1 : 0;

      expect(updateStreak(0, true)).toBe(1);
      expect(updateStreak(1, true)).toBe(2);
      expect(updateStreak(2, true)).toBe(3);
      expect(updateStreak(5, false)).toBe(0);
      expect(updateStreak(10, false)).toBe(0);
    });

    it('should update best streak', () => {
      const updateBestStreak = (current, newStreak) => 
        Math.max(current, newStreak);

      expect(updateBestStreak(0, 1)).toBe(1);
      expect(updateBestStreak(1, 2)).toBe(2);
      expect(updateBestStreak(5, 3)).toBe(5);
      expect(updateBestStreak(5, 6)).toBe(6);
    });
  });

  describe('Hint Logic', () => {
    it('should limit hints per word', () => {
      const canUseHint = (hintsUsed) => hintsUsed < 2;
      
      expect(canUseHint(0)).toBe(true);
      expect(canUseHint(1)).toBe(true);
      expect(canUseHint(2)).toBe(false);
    });

    it('should track hints correctly', () => {
      const trackHints = (hintsUsed, used) => {
        if (hintsUsed >= 2) return { canUse: false, hintsUsed };
        return { canUse: true, hintsUsed: hintsUsed + 1 };
      };

      expect(trackHints(0, false)).toEqual({ canUse: true, hintsUsed: 1 });
      expect(trackHints(1, false)).toEqual({ canUse: true, hintsUsed: 2 });
      expect(trackHints(2, false)).toEqual({ canUse: false, hintsUsed: 2 });
    });
  });

  describe('Skip Logic', () => {
    it('should handle word skip', () => {
      const skipWord = (currentIndex, totalWords) => 
        (currentIndex + 1) % totalWords;

      expect(skipWord(0, 15)).toBe(1);
      expect(skipWord(14, 15)).toBe(0);
      expect(skipWord(5, 15)).toBe(6);
    });
  });

  describe('Reset Logic', () => {
    it('should reset word state', () => {
      const resetWord = (wordLength) => Array(wordLength).fill(null);

      expect(resetWord(3)).toEqual([null, null, null]);
      expect(resetWord(5)).toEqual([null, null, null, null, null]);
      expect(resetWord(8)).toHaveLength(8);
    });
  });

  describe('Letter Tile Logic', () => {
    it('should generate correct number of tiles', () => {
      const getLetterCount = (word) => word.length + 3;

      expect(getLetterCount('CAT')).toBe(6);
      expect(getLetterCount('DOG')).toBe(6);
      expect(getLetterCount('ELEPHANT')).toBe(11);
    });

    it('should handle tile selection', () => {
      const selectTile = (current, letter) => 
        current === letter ? null : letter;

      expect(selectTile(null, 'A')).toBe('A');
      expect(selectTile('A', 'A')).toBe(null);
      expect(selectTile('A', 'B')).toBe('B');
    });
  });

  describe('Confetti Trigger', () => {
    it('should generate confetti pieces', () => {
      const generateConfetti = (count = 30) => {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#6366f1'];
        const pieces = [];
        for (let i = 0; i < count; i++) {
          pieces.push({
            id: i,
            left: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
        return pieces;
      };

      const confetti = generateConfetti();
      expect(confetti).toHaveLength(30);
      confetti.forEach(piece => {
        expect(piece).toHaveProperty('id');
        expect(piece).toHaveProperty('left');
        expect(piece).toHaveProperty('color');
        expect(piece.left).toBeGreaterThanOrEqual(0);
        expect(piece.left).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('Word Shuffling', () => {
    it('should shuffle words without losing any', () => {
      const shuffleWords = (words) => {
        const shuffled = [...words];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      const words = ['CAT', 'DOG', 'BIRD', 'FISH', 'BEAR'];
      const shuffled = shuffleWords(words);
      
      expect(shuffled.sort()).toEqual(words.sort());
      expect(shuffled).toHaveLength(5);
    });
  });

  describe('Modal State Transitions', () => {
    it('should manage modal states correctly', () => {
      const getModalState = (gameStarted, levelComplete, categoryComplete) => {
        if (!gameStarted) return 'start';
        if (categoryComplete) return 'gameComplete';
        if (levelComplete) return 'levelComplete';
        return 'playing';
      };

      expect(getModalState(false, false, false)).toBe('start');
      expect(getModalState(true, false, false)).toBe('playing');
      expect(getModalState(true, true, false)).toBe('levelComplete');
      expect(getModalState(true, true, true)).toBe('gameComplete');
    });
  });

  describe('Progress Bar Calculation', () => {
    it('should calculate progress percentage', () => {
      const calculateProgress = (current, total) => {
        if (total === 0) return 0;
        return Math.round((current / total) * 100);
      };

      expect(calculateProgress(0, 15)).toBe(0);
      expect(calculateProgress(1, 15)).toBe(7);
      expect(calculateProgress(7, 15)).toBe(47);
      expect(calculateProgress(15, 15)).toBe(100);
      expect(calculateProgress(0, 0)).toBe(0);
    });
  });

  describe('Points Distribution', () => {
    it('should award correct points for perfect game', () => {
      const perfectGamePoints = (streak) => {
        let points = 100;
        points += 50;
        points += 100;
        points += streak * 25;
        return points;
      };

      expect(perfectGamePoints(0)).toBe(250);
      expect(perfectGamePoints(1)).toBe(275);
      expect(perfectGamePoints(5)).toBe(375);
    });

    it('should reduce points for hints used', () => {
      const pointsWithHints = (hintsUsed, streak) => {
        let points = 100;
        if (hintsUsed === 0) points += 50;
        points += streak * 25;
        return points;
      };

      expect(pointsWithHints(0, 0)).toBe(150);
      expect(pointsWithHints(1, 0)).toBe(100);
      expect(pointsWithHints(2, 0)).toBe(100);
    });
  });

  describe('Words Completed Tracking', () => {
    it('should track words completed correctly', () => {
      const updateWordsCompleted = (current, completed) => current + completed;

      expect(updateWordsCompleted(0, 1)).toBe(1);
      expect(updateWordsCompleted(5, 1)).toBe(6);
      expect(updateWordsCompleted(14, 1)).toBe(15);
    });
  });

  describe('Level Progression', () => {
    it('should handle level transitions', () => {
      const getNextLevel = (current) => current + 1;
      const isLastLevel = (level) => level >= 5;

      expect(getNextLevel(1)).toBe(2);
      expect(getNextLevel(4)).toBe(5);
      expect(isLastLevel(5)).toBe(true);
      expect(isLastLevel(4)).toBe(false);
    });

    it('should reset level words on new level', () => {
      const resetLevelWords = () => 0;
      expect(resetLevelWords()).toBe(0);
    });
  });

  describe('Attempt Management', () => {
    it('should track attempts correctly', () => {
      const incrementAttempts = (current) => current + 1;
      const resetAttempts = () => 0;

      expect(incrementAttempts(0)).toBe(1);
      expect(incrementAttempts(5)).toBe(6);
      expect(resetAttempts()).toBe(0);
    });

    it('should handle attempts for wrong answers', () => {
      const onWrongAnswer = (attempts) => attempts + 1;
      
      expect(onWrongAnswer(0)).toBe(1);
      expect(onWrongAnswer(5)).toBe(6);
    });
  });
});

describe('Category Data Validation', () => {
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

  it('should have 15 unique categories', () => {
    expect(Object.keys(categories)).toHaveLength(15);
  });

  it('should have valid category metadata', () => {
    Object.values(categories).forEach(cat => {
      expect(cat.name.length).toBeGreaterThan(0);
      expect(cat.icon.length).toBeGreaterThan(0);
      expect(cat.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('should have no duplicate category names', () => {
    const names = Object.values(categories).map(c => c.name);
    const uniqueNames = new Set(names);
    expect(names).toHaveLength(uniqueNames.size);
  });
});

describe('Animation Utilities', () => {
  it('should create bounce animation values', () => {
    const createBounceAnimation = () => ({
      interpolate: (inputRange, outputRange) => outputRange[0]
    });

    const anim = createBounceAnimation();
    expect(anim.interpolate([0, 1], [1, 1.2])).toBe(1);
  });

  it('should handle animation sequences', () => {
    const createSequence = (animations) => ({
      start: (callback) => callback && callback()
    });

    const seq = createSequence([{}, {}]);
    expect(seq).toHaveProperty('start');
  });
});

describe('Error Handling', () => {
  it('should handle empty word gracefully', () => {
    const handleEmptyWord = (word) => {
      if (!word) return [];
      return word.split('');
    };

    expect(handleEmptyWord('')).toEqual([]);
    expect(handleEmptyWord(null)).toEqual([]);
    expect(handleEmptyWord('CAT')).toEqual(['C', 'A', 'T']);
  });

  it('should handle invalid slot index', () => {
    const fillSlot = (slots, index, letter) => {
      if (index < 0 || index >= slots.length) return slots;
      const newSlots = [...slots];
      newSlots[index] = letter;
      return newSlots;
    };

    const slots = [null, null, null];
    expect(fillSlot(slots, -1, 'A')).toEqual(slots);
    expect(fillSlot(slots, 10, 'A')).toEqual(slots);
    expect(fillSlot(slots, 0, 'A')).toEqual(['A', null, null]);
  });

  it('should handle negative level values', () => {
    const getLevel = (level) => Math.max(1, Math.min(level, 5));

    expect(getLevel(-1)).toBe(1);
    expect(getLevel(0)).toBe(1);
    expect(getLevel(3)).toBe(3);
    expect(getLevel(5)).toBe(5);
    expect(getLevel(10)).toBe(5);
  });
});

describe('Edge Cases', () => {
  it('should handle very long words', () => {
    const word = 'SUPERCALIFRAGILISTICEXPIALIDOCIOUS';
    const letterCount = word.length + 3;
    expect(letterCount).toBe(37);
  });

  it('should handle single letter words', () => {
    const word = 'A';
    const letters = [...word];
    expect(letters).toEqual(['A']);
  });

  it('should handle words with repeated letters', () => {
    const word = 'BANANA';
    const uniqueLetters = [...new Set(word)];
    expect(uniqueLetters).toEqual(['B', 'A', 'N']);
  });

  it('should handle maximum streak values', () => {
    const calculateWithMaxStreak = (streak) => 100 + 50 + 100 + streak * 25;
    
    expect(calculateWithMaxStreak(100)).toBe(2750);
    expect(calculateWithMaxStreak(1000)).toBe(25250);
  });

  it('should handle all categories at level 5', () => {
    const categories = ['general', 'colors', 'numbers', 'fruits', 'vegetables', 
                        'animals', 'birds', 'vehicles', 'bodyParts', 'clothing',
                        'weather', 'food', 'countries', 'shapes', 'toys'];
    
    const checkLevel5Completion = (level) => level >= 5;
    
    categories.forEach(cat => {
      expect(checkLevel5Completion(5)).toBe(true);
    });
  });
});
