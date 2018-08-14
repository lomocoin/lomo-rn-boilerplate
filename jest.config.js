module.exports = {
  preset: 'react-native',
  verbose: true,
  setupFiles: ['./jest.setup.js'],
  testRegex: '/__tests__/.*\\.spec\\.js$',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-vector-icons|react-native-i18n|mobx-react)/)',
  ],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
};
