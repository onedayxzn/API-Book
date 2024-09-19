module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverage: true,
  collectCoverageFrom: ["**/controller/*.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text"],
};
