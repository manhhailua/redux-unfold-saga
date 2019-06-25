/* eslint-disable */
import { AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';

export interface UnfoldSagaActionType extends AnyAction {
  callbacks: UnfoldSagaCallbacksType;
  options: any;
  payload: any;
}

export interface UnfoldSagaActionExecutionType {
  (
    payload?: any,
    callbacks?: UnfoldSagaCallbacksType,
    options?: any,
  ): UnfoldSagaActionType;
}

export interface UnfoldSagaCallbacksType {
  onBeginning?: Function;
  onFailure?: Function;
  onFinish?: Function;
  onSuccess?: Function;
}

export interface UnfoldSagaHandlerType {
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
