module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      classes: true,
      jsx: true,
      modules: true,
      legacyDecorators: true
    }
  },

  settings: {
    'import/resolver': 'webpack',
    react: {
      version: 'detect'
    }
  },

  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },

  plugins: ['import', 'jest', 'promise', 'react', 'react-hooks'],

  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],

  rules: {
    // Import
    'import/no-unresolved': ['error', {ignore: ['.mock.json$']}],

    // Jest
    // jest/recommended makes these warnings, but we want errors
    'jest/expect-expect': 'error',
    'jest/no-commented-out-tests': 'error',

    // Promises
    // promise/recommended makes these warnings, but we want errors
    'promise/no-callback-in-promise': 'error',
    'promise/no-nesting': 'error',

    // React
    // no prop-type enforcment yet
    'react/prop-types': 'off'
  }
};
