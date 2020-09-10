import { call, put } from 'redux-saga/effects';

export const catchGenericError = ({ onErrorAction = null } = {}) => (fn) =>
  function* (...args) {
    try {
      yield call(fn, ...args);
    } catch (error) {
      if (onErrorAction !== null) {
        yield put(onErrorAction(error.message));
      }
    }
  };

const catchErrors = (onErrorAction) => catchGenericError(onErrorAction);

export default catchErrors;
