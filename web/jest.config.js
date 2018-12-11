module.exports = {
  "globals": {
    "ts-jest": {
      "skipBabel": true,
      "enableTsDiagnostics": false
    }
  },
  "roots": [
    "<rootDir>/test"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "testMatch": ["**/*.test.ts"],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
};
