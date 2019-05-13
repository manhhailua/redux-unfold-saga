/* eslint-disable */
import { SagaIterator } from 'redux-saga';

declare module 'src/@types/redux-unfold-saga' {
  interface UnfoldSagaHandlerType {
    handler: Function;
    key: string;
  }

  interface UnfoldSagaCallbacksType {
    onBeginning?: Function;
    onFailure?: Function;
    onFinish?: Function;
    onSuccess?: Function;
  }

  export function createActionTypeOnBeginning(key: string): string;

  export function createActionTypeOnFailure(key: string): string;

  export function createActionTypeOnFinish(key: string): string;

  export function createActionTypeOnSuccess(key: string): string;

  export function createAction(type: string): Function;

  export function unfoldSaga(
    type: UnfoldSagaHandlerType,
    callback: UnfoldSagaCallbacksType,
  ): SagaIterator;
}
