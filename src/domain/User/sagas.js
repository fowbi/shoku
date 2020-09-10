import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash/fp';
import catchErrors from '../../api/sagas';
import { FETCH_USER, SET_VISITOR, fetchUserError, setVisitor as setVisitorAction, setUser } from './actions';
import api from '../../api';
import { getAccessToken } from '../../utils/localStorage';

export function* authenticate(username, password) {
  const response = yield call([api, 'signIn'], { username, password });
  const { name, email } = response.data;
  const token = get('x-auth-token', response.headers);

  yield put(setUser({ name, email }));
  localStorage.setItem('token', token);
}

export function* fetchUser() {
  const token = getAccessToken();

  if (token !== null) {
    const response = yield call([api, 'profile']);
    const { name, email } = response.data;

    yield put(setUser({ name, email }));
  } else {
    yield put(setVisitorAction());
  }
}

export function* setVisitor() {
  yield localStorage.removeItem('token');
}

export default function* () {
  yield takeLatest(
    FETCH_USER,
    catchErrors({
      onErrorAction: fetchUserError,
    })(fetchUser)
  );

  yield takeLatest(SET_VISITOR, setVisitor);
}
