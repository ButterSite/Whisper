module.exports = {
moduleDirectories: ['node_modules', 'src'],
transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^openpgp$': '<rootDir>/node_modules/openpgp/dist/openpgp.min.js',
    '^styled-components$': '<rootDir>/node_modules/styled-components',
  },
    transformIgnorePatterns: [
  "/node_modules/(?!styled-components)/"
]

  };