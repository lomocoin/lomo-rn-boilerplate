jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

jest.mock(
  'NativeEventEmitter',
  () =>
    class NativeEventEmitter {
      addListener = () => jest.fn();
      removeListener = () => jest.fn();
    },
);

jest.mock('react-native-device-info', () => ({
  getModel: () => 'iPhone 6',
  getVersion: jest.fn(),
  getBuildNumber: jest.fn(),
}));
