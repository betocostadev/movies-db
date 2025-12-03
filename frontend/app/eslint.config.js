// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
import eslintConfigPrettier from 'eslint-config-prettier/flat'
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const eslintPluginReactNative = require('eslint-plugin-react-native')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    plugins: {
      'react-native': eslintPluginReactNative,
    },
    rules: {
      'react-native/no-unused-styles': 'error',
      semi: 'off',
      quotes: ['error', 'single'],
    },
  },
])
