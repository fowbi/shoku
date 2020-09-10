import { call, put, takeLatest } from 'redux-saga/effects';
import catchErrors from '../../../api/sagas';
import { AUTHENTICATE, authenticationError, authenticationSuccess } from './actions';
import { authenticate } from '../../../domain/User/sagas';

export function* signIn(action) {
  yield call(authenticate, action.payload.username, action.payload.password);
  yield put(authenticationSuccess());
}

export default function* () {
  yield takeLatest(
    AUTHENTICATE,
    catchErrors({
      onErrorAction: authenticationError,
    })(signIn)
  );
}
