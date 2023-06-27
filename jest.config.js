/** @format */

module.exports = {
  // ...
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!axios)"],
  extensionsToTreatAsEsm: [".js", ".jsx"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
