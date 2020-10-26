import { createAction } from 'redux-actions';

export const FETCH_MEALS = 'FETCH_MEALS';
export const FETCH_MEALS_ERROR = 'FETCH_MEALS_ERROR';
export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';

export const fetchMeals = createAction(FETCH_MEALS);
export const fetchMealsError = createAction(FETCH_MEALS_ERROR);
export const fetchMealsSuccess = createAction(FETCH_MEALS_SUCCESS);
