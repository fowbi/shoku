import { createAction } from 'redux-actions';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';

export const authenticate = createAction(AUTHENTICATE);
export const authenticationError = createAction(AUTHENTICATION_ERROR);
export const authenticationSuccess = createAction(AUTHENTICATION_SUCCESS);
