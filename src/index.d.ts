/* eslint-disable */
import { AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';

declare module 'redux-unfold-saga' {
  interface UnfoldSagaActionType extends AnyAction {
    callbacks: UnfoldSagaCallbacksType;
    options: any;
    payload: any;
  }

  interface UnfoldSagaActionExecutionType {
    (
      payload: any,
      callbacks?: UnfoldSagaCallbacksType,
      options?: any,
    ): UnfoldSagaActionType;
  }

  interface UnfoldSagaCallbacksType {
    onBeginning?: Function;
    onFailure?: Function;
    onFinish?: Function;
    onSuccess?: Function;
  }

  interface UnfoldSagaHandlerType {
    handler: Function;
    key: string;
  }

  export function createActionTypeOnBeginning(key: string): string;

  export function createActionTypeOnFailure(key: string): string;

  export function createActionTypeOnFinish(key: string): string;

  export function createActionTypeOnSuccess(key: string): string;

  export function createAction(type: string): UnfoldSagaActionExecutionType;

  export function unfoldSaga(
    type: UnfoldSagaHandlerType,
    callback: UnfoldSagaCallbacksType,
  ): SagaIterator;
}
