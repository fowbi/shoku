export function getAccessToken() {
  return localStorage.getItem('token');
}

export default getAccessToken;
