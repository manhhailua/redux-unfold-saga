/* eslint-disable */
import { AnyAction } from 'redux';

export interface UnfoldSagaActionType<PayloadType = any, OptionType = any> extends AnyAction {
  callbacks: UnfoldSagaCallbacksType;
  options: OptionType;
  payload: PayloadType;
}

export interface UnfoldSagaActionExecutionType<PayloadType = any, OptionType = any> {
  (payload?: PayloadType, callbacks?: UnfoldSagaCallbacksType, options?: OptionType): UnfoldSagaActionType;
}

export interface UnfoldSagaCallbacksType {
  onBeginning?: Function;
  onFailure?: Function;
  onFinish?: Function;
  onSuccess?: Function;
}

export interface UnfoldSagaHandlerType {
  handler: Function | GeneratorFunction;
  key: string;
}

export function createActionTypeOnBeginning(key: string): string;

export function createActionTypeOnFailure(key: string): string;

export function createActionTypeOnFinish(key: string): string;

export function createActionTypeOnSuccess(key: string): string;

export function createAction<P, O>(type: string): UnfoldSagaActionExecutionType<P, O>;

export function unfoldSaga(type: UnfoldSagaHandlerType, callback: UnfoldSagaCallbacksType): any;
