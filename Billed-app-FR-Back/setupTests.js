
import '@testing-library/jest-dom'; 


import fetch from 'node-fetch';
global.fetch = fetch;


const fixtures = require("./tests/fixtures");


beforeAll(async () => {
  await fixtures.reset();
});


beforeEach(async () => {
  await fixtures.reset();
});

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.fetch = jest.fn();


