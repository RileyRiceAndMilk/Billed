module.exports = {
  collectCoverage: true, 
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", 
    "!src/**/index.js", 
  ],
  coverageDirectory: "coverage", 
  coverageThreshold: { 
    global: {
      branches: 80, 
      functions: 80, 
      lines: 80, 
      statements: 80, 
    },
  },
  coverageReporters: [
    "text", 
    "lcov", 
  ],
  testEnvironment: "jsdom", 
  setupFilesAfterEnv: [
    "<rootDir>/setup-jest.js", 
  ],
};



  