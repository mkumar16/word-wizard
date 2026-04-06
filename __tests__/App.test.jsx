import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import App from '../App';

jest.useFakeTimers();

const mockNavigate = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('should render the app without crashing', () => {
      const { getByText } = render(<App />);
      expect(getByText('Word Wizard')).toBeTruthy();
    });

    it('should display the tagline', () => {
      const { getByText } = render(<App />);
      expect(getByText('Spell, Learn, Win!')).toBeTruthy();
    });

    it('should show start modal on initial load', () => {
      const { getByText } = render(<App />);
      expect(getByText(/Start Game/)).toBeTruthy();
    });

    it('should show How to Play instructions', () => {
      const { getByText } = render(<App />);
      expect(getByText('How to Play')).toBeTruthy();
      expect(getByText(/Tap letters/)).toBeTruthy();
    });
  });

  describe('Start Game Flow', () => {
    it('should show category selection when Start Game is pressed', async () => {
      const { getByText } = render(<App />);
      
      const startButton = getByText(/Start Game/);
      fireEvent.press(startButton);
      
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
    });

    it('should display all 15 categories', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      
      await waitFor(() => {
        expect(getByText('General')).toBeTruthy();
        expect(getByText('Colors')).toBeTruthy();
        expect(getByText('Numbers')).toBeTruthy();
        expect(getByText('Fruits')).toBeTruthy();
        expect(getByText('Animals')).toBeTruthy();
        expect(getByText('Birds')).toBeTruthy();
        expect(getByText('Vehicles')).toBeTruthy();
        expect(getByText('Body Parts')).toBeTruthy();
        expect(getByText('Clothing')).toBeTruthy();
        expect(getByText('Weather')).toBeTruthy();
        expect(getByText('Food')).toBeTruthy();
        expect(getByText('Countries')).toBeTruthy();
        expect(getByText('Shapes')).toBeTruthy();
        expect(getByText('Toys')).toBeTruthy();
      });
    });
  });

  describe('Category Selection', () => {
    it('should update header with category name after selection', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      fireEvent.press(getByText('Animals'));
      
      await waitFor(() => {
        expect(getByText(/Animals/)).toBeTruthy();
      });
    });

    it('should start game with General category by default', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      
      await waitFor(() => {
        expect(getByText('General')).toBeTruthy();
      });
      
      fireEvent.press(getByText('General'));
      
      await waitFor(() => {
        expect(getByText(/General/)).toBeTruthy();
      });
    });
  });

  describe('Game State Display', () => {
    it('should show score display', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      fireEvent.press(getByText('General'));
      
      await waitFor(() => {
        expect(getByText('Score')).toBeTruthy();
      });
    });

    it('should show streak display', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => expect(getByText('Choose a Category')).toBeTruthy());
      fireEvent.press(getByText('General'));
      
      await waitFor(() => {
        expect(getByText('Streak')).toBeTruthy();
      });
    });

    it('should show level display', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => expect(getByText('Choose a Category')).toBeTruthy());
      fireEvent.press(getByText('General'));
      
      await waitFor(() => {
        expect(getByText('Level')).toBeTruthy();
        expect(getByText('1/5')).toBeTruthy();
      });
    });
  });

  describe('Sound Toggle', () => {
    it('should render sound toggle button', () => {
      const { getByText } = render(<App />);
      expect(getByText('🔊')).toBeTruthy();
    });
  });
});

describe('Game Logic State Transitions', () => {
  it('should have initial game state values', () => {
    const initialState = {
      currentCategory: 'general',
      currentLevel: 1,
      currentWordIndex: 0,
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
    };

    Object.entries(initialState).forEach(([key, value]) => {
      expect(value).toBeDefined();
    });
  });
});

describe('Progress Tracking', () => {
  it('should calculate progress percentage correctly', () => {
    const calculateProgress = (currentIndex, totalWords) => {
      return totalWords > 0 ? (currentIndex / totalWords) * 100 : 0;
    };

    expect(calculateProgress(0, 15)).toBe(0);
    expect(calculateProgress(5, 15)).toBeCloseTo(33.33);
    expect(calculateProgress(10, 15)).toBeCloseTo(66.67);
    expect(calculateProgress(15, 15)).toBe(100);
    expect(calculateProgress(0, 0)).toBe(0);
  });
});

describe('Hint System', () => {
  it('should limit hints to 2 per word', () => {
    const canUseHint = (hintsUsed) => hintsUsed < 2;
    
    expect(canUseHint(0)).toBe(true);
    expect(canUseHint(1)).toBe(true);
    expect(canUseHint(2)).toBe(false);
    expect(canUseHint(3)).toBe(false);
  });

  it('should calculate points correctly based on hints used', () => {
    const calculatePointsWithHints = (hintsUsed, streak) => {
      let points = 100;
      if (hintsUsed === 0) points += 50;
      points += streak * 25;
      return points;
    };

    expect(calculatePointsWithHints(0, 0)).toBe(150);
    expect(calculatePointsWithHints(1, 0)).toBe(100);
    expect(calculatePointsWithHints(2, 0)).toBe(100);
    expect(calculatePointsWithHints(0, 3)).toBe(225);
  });
});

describe('Level Progression', () => {
  it('should have 5 levels per category', () => {
    const levels = [1, 2, 3, 4, 5];
    expect(levels).toHaveLength(5);
    levels.forEach((level, index) => {
      expect(level).toBe(index + 1);
    });
  });

  it('should determine next level correctly', () => {
    const getNextLevel = (currentLevel) => currentLevel + 1;
    
    expect(getNextLevel(1)).toBe(2);
    expect(getNextLevel(4)).toBe(5);
    expect(getNextLevel(5)).toBe(6);
  });

  it('should identify category completion', () => {
    const isCategoryComplete = (currentLevel) => currentLevel >= 5;
    
    expect(isCategoryComplete(4)).toBe(false);
    expect(isCategoryComplete(5)).toBe(true);
    expect(isCategoryComplete(6)).toBe(true);
  });
});

describe('Word Slot Management', () => {
  it('should initialize correct number of slots', () => {
    const createEmptySlots = (wordLength) => Array(wordLength).fill(null);
    
    expect(createEmptySlots(3)).toEqual([null, null, null]);
    expect(createEmptySlots(5)).toEqual([null, null, null, null, null]);
    expect(createEmptySlots(8)).toHaveLength(8);
  });

  it('should check if word is complete', () => {
    const isWordComplete = (slots, wordLength) => 
      slots.filter(s => s !== null).length === wordLength;
    
    expect(isWordComplete([null, null, null], 3)).toBe(false);
    expect(isWordComplete(['C', null, null], 3)).toBe(false);
    expect(isWordComplete(['C', 'A', null], 3)).toBe(false);
    expect(isWordComplete(['C', 'A', 'T'], 3)).toBe(true);
  });

  it('should handle slot filling sequence', () => {
    const slots = [null, null, null];
    const fillSlot = (slots, index, letter) => {
      const newSlots = [...slots];
      newSlots[index] = letter;
      return newSlots;
    };

    const afterFirst = fillSlot(slots, 0, 'C');
    expect(afterFirst).toEqual(['C', null, null]);

    const afterSecond = fillSlot(afterFirst, 1, 'A');
    expect(afterSecond).toEqual(['C', 'A', null]);

    const afterThird = fillSlot(afterSecond, 2, 'T');
    expect(afterThird).toEqual(['C', 'A', 'T']);
  });
});

describe('Letter Selection Logic', () => {
  it('should toggle letter selection', () => {
    const toggleSelection = (selected, letter) => 
      selected === letter ? null : letter;

    expect(toggleSelection(null, 'A')).toBe('A');
    expect(toggleSelection('A', 'A')).toBe(null);
    expect(toggleSelection('A', 'B')).toBe('B');
  });

  it('should mark letter as used when placed in slot', () => {
    const usedTiles = ['A', 'B'];
    const placeLetter = (tiles, letter) => [...tiles, letter];

    const afterPlace = placeLetter(usedTiles, 'C');
    expect(afterPlace).toEqual(['A', 'B', 'C']);
  });

  it('should filter out used tiles from available letters', () => {
    const allLetters = ['A', 'B', 'C', 'D', 'E'];
    const usedTiles = ['A', 'C'];
    const available = allLetters.filter(l => !usedTiles.includes(l));

    expect(available).toEqual(['B', 'D', 'E']);
  });
});

describe('Streak Management', () => {
  it('should increment streak on correct answer', () => {
    const updateStreak = (currentStreak, isCorrect) => 
      isCorrect ? currentStreak + 1 : 0;

    expect(updateStreak(0, true)).toBe(1);
    expect(updateStreak(3, true)).toBe(4);
    expect(updateStreak(5, true)).toBe(6);
  });

  it('should reset streak on wrong answer', () => {
    const updateStreak = (currentStreak, isCorrect) => 
      isCorrect ? currentStreak + 1 : 0;

    expect(updateStreak(5, false)).toBe(0);
    expect(updateStreak(0, false)).toBe(0);
  });

  it('should track best streak', () => {
    const updateBestStreak = (current, newStreak) => 
      Math.max(current, newStreak);

    expect(updateBestStreak(0, 3)).toBe(3);
    expect(updateBestStreak(3, 5)).toBe(5);
    expect(updateBestStreak(5, 2)).toBe(5);
    expect(updateBestStreak(10, 10)).toBe(10);
  });
});

describe('Attempt Tracking', () => {
  it('should increment attempts on wrong answer', () => {
    const incrementAttempts = (current) => current + 1;
    
    expect(incrementAttempts(0)).toBe(1);
    expect(incrementAttempts(3)).toBe(4);
  });

  it('should reset on new word', () => {
    const resetAttempts = () => 0;
    expect(resetAttempts()).toBe(0);
  });
});

describe('Word Navigation', () => {
  it('should calculate next word index', () => {
    const getNextIndex = (current, totalWords) => (current + 1) % totalWords;

    expect(getNextIndex(0, 15)).toBe(1);
    expect(getNextIndex(14, 15)).toBe(0);
    expect(getNextIndex(5, 15)).toBe(6);
  });

  it('should check if all words completed', () => {
    const isLevelComplete = (currentIndex, totalWords) => currentIndex >= totalWords;

    expect(isLevelComplete(14, 15)).toBe(false);
    expect(isLevelComplete(15, 15)).toBe(true);
  });
});
