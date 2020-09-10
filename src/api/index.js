import axios from 'axios';
import { getAccessToken } from '../utils/localStorage';

const apiAxiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}`,
});

/* -- DEBUG START --------------------------------------------------- */
apiAxiosClient.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

apiAxiosClient.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});
/* -- DEBUG END --------------------------------------------------- */

apiAxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.status, error.response);
    throw error;
  }
);

apiAxiosClient.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  return request;
});

function Api(apiClient) {
  this.apiClient = apiClient;
}

Api.prototype.signUp = async function (data) {
  return await this.apiClient.post('/user/register', data);
};

Api.prototype.signIn = function (data) {
  return this.apiClient.post('/user/login', data);
};

Api.prototype.profile = function () {
  return this.apiClient.post('/user/profile');
};

Api.prototype.meals = async function (date) {
  const formattedDate = date.format('YYYY-MM-DD');
  return await this.apiClient.get(`/user/meals/${formattedDate}`);
};

Api.prototype.addMeal = async function (meal) {
  return await this.apiClient.post('/meal/addMeal', meal);
};

Api.prototype.deleteMeal = async function (id) {
  return await this.apiClient.delete(`/meal/${id}`);
};

Api.prototype.setMealQuality = async function (id, quality) {
  return await this.apiClient.post(`/meal/setQuality/${id}`, { quality });
};

const api = new Api(apiAxiosClient);

export default api;
