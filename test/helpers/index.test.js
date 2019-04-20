import { noop } from '../../src/helpers';

describe('helpers', () => {
  describe('noop', () => {
    test('should return undefined', () => {
      expect(undefined).toBe(noop());
    });
  });
});
