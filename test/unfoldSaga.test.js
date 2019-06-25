import { put } from 'redux-saga/effects';
import {
  createActionTypeOnBeginning,
  createActionTypeOnFailure,
  createActionTypeOnFinish,
  createActionTypeOnSuccess,
  unfoldSaga,
} from '../src';
import { noop } from '../src/helpers';

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
      expect(result.value).toEqual(put({ type: createActionTypeOnBeginning(key) }));
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
      expect(result.value).toEqual(put({ type: createActionTypeOnSuccess(key) }));
    });

    test('should CALL onSuccess callback', () => {
      expect(result.done).toBe(false);
    });

    test('should PUT onFinish action', () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(put({ type: createActionTypeOnFinish(key) }));
    });

    test('should CALL onFinish callback', () => {
      expect(result.done).toBe(false);
    });

    test('should end', () => {
      result = generator.next();
      expect(result.done).toBe(true);
    });
  });

  describe('on error flow', () => {
    const fakeError = new Error('test');

    beforeAll(() => {
      key = 'TEST';
      generator = unfoldSaga({
        handler: () => {
          throw fakeError;
        },
        key,
      });
    });

    test('should PUT onBeginning action', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(put({ type: createActionTypeOnBeginning(key) }));
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
      expect(result.value).toEqual(put({ type: createActionTypeOnFailure(key), payload: fakeError }));
    });

    test('should CALL onFailure callback', () => {
      result = generator.next();
      expect(result.done).toBe(false);
    });

    test('should PUT onFinish action', () => {
      result = generator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(put({ type: createActionTypeOnFinish(key) }));
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
