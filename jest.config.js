export const transform = {
  "^.+\\.jsx?$": "babel-jest",
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.ts"
  ]
};
  