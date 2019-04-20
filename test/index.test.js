import { put } from 'redux-saga/effects';
import {
  createActionTypeOnBeginning,
  createActionTypeOnFailure,
  createActionTypeOnFinish,
  createActionTypeOnSuccess,
  unfoldSaga,
} from '../src';
import { noop } from '../src/helpers';

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

describe('unfoldSaga', () => {
  let generator;
  let key;
  let result;

  describe('on happy flow', () => {
    beforeAll(() => {
      key = 'TEST';
      generator = unfoldSaga({
        handler: noop,
        key,
      });
    });

    beforeEach(() => {
      result = generator.next();
    });

    test('should PUT onBeginning action', () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnBeginning(key) }),
      );
    });

    test('should CALL onBeginning callback', () => {
      expect(result.done).toBe(false);
      // expect(result.value).toEqual(
      //   put({ type: createActionTypeOnBeginning(key) })
      // );
    });

    test('should CALL handler', () => {
      expect(result.done).toBe(false);
    });

    test('should PUT onSuccess action', () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnSuccess(key) }),
      );
    });

    test('should CALL onSuccess callback', () => {
      expect(result.done).toBe(false);
    });

    test('should PUT onFinish action', () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFinish(key) }),
      );
    });

    test('should CALL onFinish callback', () => {
      expect(result.done).toBe(false);
    });

    test('should end', () => {
      result = generator.next();
      expect(result.done).toBe(true);
    });
  });

  describe('on error flow on development mode', () => {
    const fakeError = new Error('test');

    beforeAll(() => {
      key = 'TEST';
      generator = unfoldSaga({
        key,
      });
    });

    test('should PUT onBeginning action', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnBeginning(key) }),
      );
    });

    test('should CALL onBeginning callback', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should CALL handler', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should PUT onFailure action', () => {
      result = generator.throw(fakeError);
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFailure(key), payload: fakeError }),
      );
    });

    test('should CALL onFailure callback', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should CALL console.log to show where the error occurs', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should CALL console.log to show the error stacktrace', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should PUT onFinish action', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFinish(key) }),
      );
    });

    test('should CALL onFinish callback', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      // mock
    });

    test('should end', () => {
      result = generator.next();
      expect(result.done).toBe(true);
    });
  });

  describe('on error flow on production mode', () => {
    const fakeError = new Error('test');

    beforeAll(() => {
      process.env.NODE_ENV = 'production';
      key = 'TEST';
      generator = unfoldSaga({
        handler: () => {
          throw fakeError;
        },
        key,
      });
    });

    afterAll(() => {
      delete process.env.NODE_ENV;
    });

    test('should PUT onBeginning action', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnBeginning(key) }),
      );
    });

    test('should CALL onBeginning callback', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should CALL handler', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should PUT onFailure action', () => {
      result = generator.throw(fakeError);
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFailure(key), payload: fakeError }),
      );
    });

    test('should CALL onFailure callback', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should PUT onFinish action', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFinish(key) }),
      );
    });

    test('should CALL onFinish callback', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      // mock
    });

    test('should end', () => {
      result = generator.next();
      expect(result.done).toBe(true);
    });
  });
});
