import { call, put } from 'redux-saga/effects';
import {
  createActionTypeOnBeginning,
  createActionTypeOnFailure,
  createActionTypeOnFinish,
  createActionTypeOnSuccess,
  unfoldSaga,
} from '../src';

describe('unfoldSaga for async handler', () => {
  let generator;
  let key;
  let result;

  const callbacksMock = {
    onBeginning: jest.fn(),
    onSuccess: jest.fn(),
    onFailure: jest.fn(),
    onFinish: jest.fn(),
  };

  describe('on happy case', () => {
    const fakeResult = 'handler-result';
    const handler = function handler() {
      return fakeResult;
    };

    describe('stateful flow', () => {
      beforeAll(() => {
        key = 'TEST';
        generator = unfoldSaga({ handler, key }, callbacksMock);
      });

      test('should PUT onBeginning action', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(put({ type: createActionTypeOnBeginning(key) }));
      });

      test('should CALL onBeginning callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onBeginning));
      });

      test('should CALL handler', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(handler));
      });

      test('should PUT onSuccess action', () => {
        result = generator.next(fakeResult);
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(put({ type: createActionTypeOnSuccess(key), payload: fakeResult }));
      });

      test('should CALL onSuccess callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onSuccess, fakeResult));
      });

      test('should PUT onFinish action', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(put({ type: createActionTypeOnFinish(key) }));
      });

      test('should CALL onFinish callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onFinish));
      });

      test('should end', () => {
        result = generator.next();
        expect(result.done).toBe(true);
        expect(result.value).toBe(fakeResult);
      });
    });

    describe('stateless flow', () => {
      beforeAll(() => {
        key = 'TEST';
        generator = unfoldSaga({ handler, key }, callbacksMock, { stateless: true });
      });

      test('should CALL onBeginning callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onBeginning));
      });

      test('should CALL handler', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(handler));
      });

      test('should CALL onSuccess callback', () => {
        result = generator.next(fakeResult);
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onSuccess, fakeResult));
      });

      test('should CALL onFinish callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onFinish));
      });

      test('should end', () => {
        result = generator.next();
        expect(result.done).toBe(true);
        expect(result.value).toBe(fakeResult);
      });
    });
  });

  describe('on error case', () => {
    const fakeError = new Error('test');
    const handler = function handler() {
      throw fakeError;
    };

    describe('stateful flow', () => {
      beforeAll(() => {
        key = 'TEST';
        generator = unfoldSaga({ handler, key }, callbacksMock);
      });

      test('should PUT onBeginning action', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(put({ type: createActionTypeOnBeginning(key) }));
      });

      test('should CALL onBeginning callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onBeginning));
      });

      test('should CALL handler', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(handler));
      });

      test('should PUT onFailure action', () => {
        result = generator.throw(fakeError);
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(put({ type: createActionTypeOnFailure(key), payload: fakeError }));
      });

      test('should CALL onFailure callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onFailure, fakeError));
      });

      test('should PUT onFinish action', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(put({ type: createActionTypeOnFinish(key) }));
      });

      test('should CALL onFinish callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onFinish));
      });

      test('should end', () => {
        result = generator.next();
        expect(result.done).toBe(true);
      });
    });

    describe('stateless flow', () => {
      beforeAll(() => {
        key = 'TEST';
        generator = unfoldSaga({ handler, key }, callbacksMock, { stateless: true });
      });

      test('should CALL onBeginning callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onBeginning));
      });

      test('should CALL handler', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(handler));
      });

      test('should CALL onError callback', () => {
        result = generator.next(fakeError);
        expect(result.done).toBe(false);
        expect(JSON.stringify(result.value)).toEqual(JSON.stringify(call(callbacksMock.onFailure, fakeError)));
      });

      test('should CALL onFinish callback', () => {
        result = generator.next();
        expect(result.done).toBe(false);
        expect(result.value).toStrictEqual(call(callbacksMock.onFinish));
      });

      test('should end', () => {
        result = generator.next();
        expect(result.done).toBe(true);
        expect(result.value).toBe(fakeError);
      });
    });
  });
});
