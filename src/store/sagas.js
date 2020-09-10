import { all } from 'redux-saga/effects';
import loginSagas from '../application/pages/Login/sagas';
import userSagas from '../domain/User/sagas';

export default function* () {
  yield all([loginSagas(), userSagas()]);
}
