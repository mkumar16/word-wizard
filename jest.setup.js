import '@testing-library/jest-native/extend-expect';

global.setTimeout = jest.fn((callback) => callback());
global.clearTimeout = jest.fn();
global.setImmediate = jest.fn((callback) => callback());

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = () => ({
    start: jest.fn(),
  });
  RN.Animated.sequence = () => ({
    start: jest.fn((cb) => cb && cb()),
  });
  return RN;
});
