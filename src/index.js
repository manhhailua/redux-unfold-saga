// @flow
import { call, put } from 'redux-saga/effects';
import { noop } from './helpers';

/**
 * Create onBeginning action type
 *
 * @param key
 * @returns {string}
 *
 * @example
 * createActionTypeOnSuccess('DO_SOMETHING') // 'DO_SOMETHING_BEGAN'
 */
export function createActionTypeOnBeginning(key: string): string {
  return `${key}_BEGAN`;
}

/**
 * Create onFailure action type
 *
 * @param key
 * @returns {string}
 *
 * @example
 * createActionTypeOnSuccess('DO_SOMETHING') // 'DO_SOMETHING_FAILED'
 */
export function createActionTypeOnFailure(key: string): string {
  return `${key}_FAILED`;
}

/**
 * Create onFinish action type
 *
 * @param key
 * @returns {string}
 *
 * @example
 * createActionTypeOnSuccess('DO_SOMETHING') // 'DO_SOMETHING_FINISHED'
 */
export function createActionTypeOnFinish(key: string): string {
  return `${key}_FINISHED`;
}

/**
 * Create onSuccess action type
 *
 * @param key
 * @returns {string}
 *
 * @example
 * createActionTypeOnSuccess('DO_SOMETHING') // 'DO_SOMETHING_SUCCEEDED'
 */
export function createActionTypeOnSuccess(key: string): string {
  return `${key}_SUCCEEDED`;
}

/**
 * Create an action for real life usage inside or even outside of a component
 *
 * @param {string} type
 * @returns {UnfoldSagaActionType}
 *
 * @example <caption>Inside of a component</caption>
 * const queryPosts = createAction('QUERY_POSTS');
 *
 * this.props.dispatch(
 *   queryPosts(
 *     {
 *       category: 'HOT',
 *     },
 *     {
 *       onBeginning: () => {
 *         // Do something before the query
 *         this.setState({ isLoading: true });
 *       }
 *       onFailure: (error) => {
 *         // Do something in case of caught error
 *       }
 *       onSuccess: (posts) => {
 *         // Do something after the query succeeded
 *       }
 *       onFinished: () => {
 *         // Do something after everything is done
 *         this.setState({ isLoading: false });
 *       }
 *     },
 *   ),
 * );
 *
 * @example <caption>Outside of a react component</caption>
 * store.dispatch(
 *   queryPosts({
 *     type: 'HOT',
 *   }),
 * );
 *
 * @example <caption>Inside another saga</caption>
 * const queryPosts = createAction('QUERY_POSTS');
 *
 * function* takeQueryPosts() {
 *   yield put(queryPosts());
 * }
 */
export function createAction(type: string): Function {
  return (
    payload: any = {},
    callbacks: UnfoldSagaCallbacksType = {
      onBeginning: noop,
      onFailure: noop,
      onFinish: noop,
      onSuccess: noop,
    },
    options: any = {},
  ): UnfoldSagaActionType => ({
    callbacks,
    options,
    payload,
    type,
  });
}

/**
 * Common saga helper that unifies handling side effects into only one standard form
 *
 * @param {UnfoldSagaHandlerType} body
 * @param {Function} body.handler Main handler function. Its returned value will become onSuccess callback param
 * @param {string} body.key Action type
 * @param {UnfoldSagaCallbacksType} callbacks
 * @param {Function} callbacks.onBeginning This callback will be called after onBeginning action is dispatched.
 * @param {Function} callbacks.onFailure This callback will be called after onFailure action is dispatched. It will only be called in case of error.
 * @param {Function} callbacks.onFinish This callback will be called after onFinish action is dispatched.
 * @param {Function} callbacks.onSuccess This callback will be called after onSuccess action is dispatched. It will not be called in case of error.
 * @returns {Saga<void>}
 *
 * @example
 * function* takeQueryPosts({ payload: { category } }) {
 *   yield unfoldSaga({
 *     handler: async () => {
 *       const posts = await queryPosts({ category });
 *       return posts;
 *     },
 *     key: 'QUERY_POSTS',
 *   });
 * }
 *
 * function* defaultSaga() {
 *   yield takeLatest('QUERY_POSTS', takeQueryPosts);
 * }
 */
export function* unfoldSaga(
  { handler, key }: UnfoldSagaHandlerType,
  { onBeginning = noop, onFailure = noop, onFinish = noop, onSuccess = noop }: UnfoldSagaCallbacksType = {},
): any {
  try {
    yield put({ type: createActionTypeOnBeginning(key) });
    yield call(onBeginning);
    const data = yield call(handler);
    yield put({ type: createActionTypeOnSuccess(key), payload: data });
    yield call(onSuccess, data);
  } catch (error) {
    yield put({ type: createActionTypeOnFailure(key), payload: error });
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
  createAction,
  unfoldSaga,
};
