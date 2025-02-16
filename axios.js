import axios from 'axios';

const instance = axios.create({
  // Укажите здесь адрес БЭКа; если он на локальном 5000 порту, так и пишем:
  baseURL: 'http://localhost:5000'
});

// Если в будущем будете использовать JWT-токен,
// можно сделать интерсептор для подстановки Authorization:

/*
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

export default instance;
