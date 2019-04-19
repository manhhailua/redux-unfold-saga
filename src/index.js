// @flow
import { call, put } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { noop } from "./helpers";

export function createActionTypeOnBeginning(key: string): string {
  return `${key}_BEGAN`;
}

export function createActionTypeOnFailure(key: string): string {
  return `${key}_FAILED`;
}

export function createActionTypeOnFinish(key: string): string {
  return `${key}_FINISHED`;
}

export function createActionTypeOnSuccess(key: string): string {
  return `${key}_SUCCEEDED`;
}

/**
 * Common saga handler
 * Unify handling saga into only one standard form
 */
export function* unfoldSaga(
  { handler = noop, key }: UnfoldSagaHandlerType = {},
  {
    onBeginning = noop,
    onFailure = noop,
    onFinish = noop,
    onSuccess = noop
  }: UnfoldSagaCallbacksType = {}
): Saga<void> {
  try {
    yield put({ type: createActionTypeOnBeginning(key) });
    yield call(onBeginning);
    const data = yield call(handler);
    yield put({ type: createActionTypeOnSuccess(key), payload: data });
    yield call(onSuccess, data);
  } catch (error) {
    yield put({ type: createActionTypeOnFailure(key), payload: error });
    if (process.env.NODE_ENV !== "production") {
      /* eslint-disable no-console */
      yield call(console.log, `Error at ${key} action`);
      yield call(console.log, error);
      /* eslint-enable */
    }
    yield call(onFailure, error);
  } finally {
    yield put({ type: createActionTypeOnFinish(key) });
    yield call(onFinish);
  }
}

export default {
  createActionTypeOnBeginning,
  createActionTypeOnFailure,
  createActionTypeOnFinish,
  createActionTypeOnSuccess,
  unfoldSaga
};
