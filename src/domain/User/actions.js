import { createAction } from 'redux-actions';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const SET_USER = 'SET_USER';
export const SET_VISITOR = 'SET_VISITOR';

export const fetchUser = createAction(FETCH_USER);
export const fetchUserError = createAction(FETCH_USER_ERROR);
export const fetchUserSuccess = createAction(FETCH_USER_SUCCESS);
export const setUser = createAction(SET_USER);
export const setVisitor = createAction(SET_VISITOR);
