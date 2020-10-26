import { call, put, takeLatest } from 'redux-saga/effects';
import catchErrors from '../../../api/sagas';
import { FETCH_MEALS, fetchMeals as fetchMealsAction, fetchMealsError, fetchMealsSuccess } from './actions';

export function* fetchMeals(action) {
  const meals = yield call(fetchMealsAction, action.payload.date);
  yield put(fetchMealsSuccess());
}

export default function* () {
  yield takeLatest(
    FETCH_MEALS,
    catchErrors({
      onErrorAction: fetchMealsError,
    })(fetchMeals)
  );
}
