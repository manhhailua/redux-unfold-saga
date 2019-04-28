import {
  createActionTypeOnBeginning,
  createActionTypeOnFailure,
  createActionTypeOnFinish,
  createActionTypeOnSuccess,
} from '../src';

describe('Action creators', () => {
  let key;

  beforeAll(() => {
    key = 'TEST';
  });

  describe('createActionTypeOnBeginning', () => {
    test('should return correct string', () => {
      const result = createActionTypeOnBeginning(key);
      expect(result).toBe('TEST_BEGAN');
    });
  });

  describe('createActionTypeOnFailure', () => {
    test('should return correct string', () => {
      const result = createActionTypeOnFailure(key);
      expect(result).toBe('TEST_FAILED');
    });
  });

  describe('createActionTypeOnFinish', () => {
    test('should return correct string', () => {
      const result = createActionTypeOnFinish(key);
      expect(result).toBe('TEST_FINISHED');
    });
  });

  describe('createActionTypeOnSuccess', () => {
    test('should return correct string', () => {
      const result = createActionTypeOnSuccess(key);
      expect(result).toBe('TEST_SUCCEEDED');
    });
  });
});
