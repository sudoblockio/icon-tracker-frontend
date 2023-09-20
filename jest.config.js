module.exports = {
  moduleNameMapper: {
    "\\.(scss|css|less|png)$": "<rootDir>/src/test/__mocks__/styleMock.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ]
};
