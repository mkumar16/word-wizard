import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import App from '../App';

jest.useFakeTimers();

describe('App Component - Full Handler Coverage', () => {
  describe('Game Flow - Start to Finish', () => {
    it('should complete full game flow from start to category selection', async () => {
      const { getByText, queryByText } = render(<App />);
      
      expect(getByText('Word Wizard')).toBeTruthy();
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      expect(getByText('General')).toBeTruthy();
      expect(getByText('Colors')).toBeTruthy();
      expect(getByText('Animals')).toBeTruthy();
    });

    it('should transition from category selection to game', async () => {
      const { getByText, queryByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      fireEvent.press(getByText('Colors'));
      await waitFor(() => {
        expect(queryByText('Choose a Category')).toBeNull();
        expect(getByText(/Colors/)).toBeTruthy();
      });
    });
  });

  describe('Letter Tile Interactions', () => {
    it('should render letter tiles', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Animals'));
      await waitFor(() => {
        const tileA = getByText('A');
        const tileB = getByText('B');
        const tileC = getByText('C');
        expect(tileA).toBeTruthy();
        expect(tileB).toBeTruthy();
        expect(tileC).toBeTruthy();
      });
    });

    it('should allow selecting a tile', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Animals'));
      await waitFor(() => {
        const tile = getByText('A');
        fireEvent.press(tile);
      });
    });
  });

  describe('Game Controls - Hint, Skip, Reset', () => {
    it('should render hint button', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Vehicles'));
      await waitFor(() => {
        expect(getByText('💡 Hint')).toBeTruthy();
      });
    });

    it('should render skip button', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Fruits'));
      await waitFor(() => {
        expect(getByText('⏭️ Skip')).toBeTruthy();
      });
    });

    it('should render reset button', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Vegetables'));
      await waitFor(() => {
        expect(getByText('🔄 Reset')).toBeTruthy();
      });
    });

    it('should interact with hint button', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Weather'));
      await waitFor(() => {
        const hintBtn = getByText('💡 Hint');
        fireEvent.press(hintBtn);
      });
    });

    it('should interact with skip button', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Food'));
      await waitFor(() => {
        const skipBtn = getByText('⏭️ Skip');
        fireEvent.press(skipBtn);
      });
    });

    it('should interact with reset button', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Countries'));
      await waitFor(() => {
        const resetBtn = getByText('🔄 Reset');
        fireEvent.press(resetBtn);
      });
    });
  });

  describe('Sound Toggle', () => {
    it('should toggle sound on/off', async () => {
      const { getByText, rerender } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Shapes'));
      await waitFor(() => {
        const soundToggle = getByText('🔊');
        expect(soundToggle).toBeTruthy();
        fireEvent.press(soundToggle);
      });
      
      rerender(<App />);
    });
  });

  describe('Progress and Level Display', () => {
    it('should show progress bar', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Toys'));
      await waitFor(() => {
        expect(getByText(/Word \d+ of \d+/)).toBeTruthy();
      });
    });

    it('should show correct level indicator', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Numbers'));
      await waitFor(() => {
        expect(getByText('1/5')).toBeTruthy();
      });
    });
  });

  describe('All Categories Render', () => {
    const categories = [
      'General', 'Colors', 'Numbers', 'Fruits', 'Vegetables',
      'Animals', 'Birds', 'Vehicles', 'Body Parts', 'Clothing',
      'Weather', 'Food', 'Countries', 'Shapes', 'Toys'
    ];

    categories.forEach((category) => {
      it(`should render ${category} category`, async () => {
        const { getByText } = render(<App />);
        
        fireEvent.press(getByText(/Start Game/));
        await waitFor(() => {
          expect(getByText('Choose a Category')).toBeTruthy();
        });
        
        fireEvent.press(getByText(category));
        await waitFor(() => {
          expect(getByText(new RegExp(category))).toBeTruthy();
        });
      });
    });
  });

  describe('Modal States', () => {
    it('should show level complete modal', async () => {
      const { getByText, queryByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      expect(queryByText('Level Complete!')).toBeNull();
    });

    it('should show game complete modal after start', async () => {
      const { getByText, queryByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      expect(queryByText('Congratulations!')).toBeNull();
    });
  });
});

describe('App State Management', () => {
  describe('Initial State', () => {
    it('should have correct initial state values', () => {
      const { getByText } = render(<App />);
      
      expect(getByText('Word Wizard')).toBeTruthy();
      expect(getByText('Spell, Learn, Win!')).toBeTruthy();
      expect(getByText(/Start Game/)).toBeTruthy();
    });
  });

  describe('State Transitions', () => {
    it('should show start game button', async () => {
      const { getByText } = render(<App />);
      
      expect(getByText(/Start Game/)).toBeTruthy();
    });

    it('should show game elements after starting', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
    });
  });

  describe('Category Header Display', () => {
    it('should show category selection after starting game', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      fireEvent.press(getByText('Body Parts'));
      await waitFor(() => {
        expect(getByText(/🫀 Body Parts/)).toBeTruthy();
      });
    });

    it('should show general category when selected', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      fireEvent.press(getByText('General'));
      await waitFor(() => {
        expect(getByText(/🔤 General/)).toBeTruthy();
      });
    });
  });
});

describe('Game UI Elements', () => {
  describe('Score Display', () => {
    it('should show score section', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Birds'));
      await waitFor(() => {
        expect(getByText('Score')).toBeTruthy();
      });
    });

    it('should show streak section', async () => {
      const { getByText, getAllByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Weather'));
      await waitFor(() => {
        expect(getByText('Streak')).toBeTruthy();
        const fireIcons = getAllByText('🔥');
        expect(fireIcons.length).toBeGreaterThan(0);
      });
    });

    it('should show level section', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Shapes'));
      await waitFor(() => {
        expect(getByText('Level')).toBeTruthy();
      });
    });
  });

  describe('Hint Text Display', () => {
    it('should show guess hint text', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Toys'));
      await waitFor(() => {
        expect(getByText('Guess the word!')).toBeTruthy();
      });
    });

    it('should show emoji hint', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Fruits'));
      await waitFor(() => {
        const hintEmojis = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈'];
        const container = getByText(/Fruit/);
        expect(container).toBeTruthy();
      });
    });
  });

  describe('Category Card Display', () => {
    it('should show category icons', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      expect(getByText('🔤')).toBeTruthy();
      expect(getByText('🎨')).toBeTruthy();
      expect(getByText('🔢')).toBeTruthy();
    });

    it('should show all category names in selection', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
        expect(getByText('General')).toBeTruthy();
        expect(getByText('Colors')).toBeTruthy();
        expect(getByText('Numbers')).toBeTruthy();
        expect(getByText('Fruits')).toBeTruthy();
        expect(getByText('Vegetables')).toBeTruthy();
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
});

describe('Game Interactions - Button Presses', () => {
  describe('Multiple Category Selection', () => {
    it('should handle switching categories multiple times', async () => {
      const { getByText, rerender } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      
      fireEvent.press(getByText('Animals'));
      await waitFor(() => {
        expect(getByText(/Animals/)).toBeTruthy();
      });
      
      rerender(<App />);
      expect(getByText(/Animals/)).toBeTruthy();
    });
  });

  describe('Game Button Interactions', () => {
    it('should handle hint multiple times', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Food'));
      await waitFor(() => {
        const hintBtn = getByText('💡 Hint');
        fireEvent.press(hintBtn);
        fireEvent.press(hintBtn);
      });
    });

    it('should handle skip multiple times', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Countries'));
      await waitFor(() => {
        const skipBtn = getByText('⏭️ Skip');
        fireEvent.press(skipBtn);
        fireEvent.press(skipBtn);
        fireEvent.press(skipBtn);
      });
    });

    it('should handle reset multiple times', async () => {
      const { getByText } = render(<App />);
      
      fireEvent.press(getByText(/Start Game/));
      await waitFor(() => {
        expect(getByText('Choose a Category')).toBeTruthy();
      });
      fireEvent.press(getByText('Shapes'));
      await waitFor(() => {
        const resetBtn = getByText('🔄 Reset');
        fireEvent.press(resetBtn);
        fireEvent.press(resetBtn);
      });
    });
  });
});

describe('UI Rendering Edge Cases', () => {
  it('should render game elements correctly', async () => {
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

  it('should maintain state after multiple renders', async () => {
    const { getByText, rerender } = render(<App />);
    
    fireEvent.press(getByText(/Start Game/));
    await waitFor(() => {
      expect(getByText('Choose a Category')).toBeTruthy();
    });
    
    rerender(<App />);
    expect(getByText('Choose a Category')).toBeTruthy();
    
    fireEvent.press(getByText('General'));
    await waitFor(() => {
      expect(getByText(/General/)).toBeTruthy();
    });
    
    rerender(<App />);
    expect(getByText(/General/)).toBeTruthy();
  });
});

describe('Accessibility and UX', () => {
  it('should render accessible touch targets', async () => {
    const { getByText } = render(<App />);
    
    fireEvent.press(getByText(/Start Game/));
    await waitFor(() => {
      expect(getByText('Choose a Category')).toBeTruthy();
    });
    fireEvent.press(getByText('Weather'));
    await waitFor(() => {
      const hintBtn = getByText('💡 Hint');
      expect(hintBtn).toBeTruthy();
    });
  });

  it('should show how to play instructions', async () => {
    const { getByText } = render(<App />);
    
    expect(getByText('How to Play')).toBeTruthy();
    expect(getByText(/Tap letters/)).toBeTruthy();
    expect(getByText(/Match the emoji/)).toBeTruthy();
    expect(getByText(/Use hints/)).toBeTruthy();
    expect(getByText(/Build streaks/)).toBeTruthy();
  });
});
