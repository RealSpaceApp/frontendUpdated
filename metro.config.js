const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  server: {
    port: 8082, // Define a porta desejada aqui
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
