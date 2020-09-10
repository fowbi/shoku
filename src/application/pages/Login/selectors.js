import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

export const selectLogin = get('login');
export const selectHasError = createSelector(selectLogin, get('hasError'));
