import { get } from 'lodash/fp';

const ACCESS_TOKEN = 'accessToken';
const ACCESS_TOKEN_HEADER = 'x-auth-token';
const REFRESH_TOKEN = 'refreshToken';
const REFRESH_TOKEN_HEADER = 'x-refresh-token';

export const signIn = (response) => {
  localStorage.setItem(ACCESS_TOKEN, get(ACCESS_TOKEN_HEADER, response.headers));
  localStorage.setItem(REFRESH_TOKEN, get(REFRESH_TOKEN_HEADER, response.headers));
};

export const signOut = () => {
  localStorage.setItem(ACCESS_TOKEN, null);
  localStorage.setItem(REFRESH_TOKEN, null);
};

export const currentUser = () => {};
