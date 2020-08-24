import axios from 'axios';

const apiAxiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}`,
});

apiAxiosClient.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

apiAxiosClient.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

function Api(apiClient) {
  this.apiClient = apiClient;
}

Api.prototype.meals = async function (date) {
  const formattedDate = date.format('YYYY-MM-DD');
  return await this.apiClient.get(`/user/meals/${formattedDate}`);
};

Api.prototype.addMeal = async function (meal) {
  return await this.apiClient.post('/meal', meal);
};

const api = new Api(apiAxiosClient);

export default api;
