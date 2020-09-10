import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

export const selectUser = get('user');
export const selectIsAuthenticated = createSelector(selectUser, get('isAuthenticated'));
export const selectUserDetails = createSelector(selectUser, get('details'));
export const selectUserToken = createSelector(selectUser, get('token'));
export const selectIsLoading = createSelector(selectUser, get('isLoading'));
