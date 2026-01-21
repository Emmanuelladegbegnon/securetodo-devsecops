import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
global.localStorage = {
  getItem: (key) => {
    return global.localStorage[key] || null;
  },
  setItem: (key, value) => {
    global.localStorage[key] = value;
  },
  removeItem: (key) => {
    delete global.localStorage[key];
  },
  clear: () => {
    for (const key in global.localStorage) {
      if (key !== 'getItem' && key !== 'setItem' && key !== 'removeItem' && key !== 'clear') {
        delete global.localStorage[key];
      }
    }
  }
};

