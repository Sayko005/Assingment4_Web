<template>
  <div>
    <h1>Вход в систему</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Имя пользователя:</label>
        <input v-model="username" />
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '@/axios.js'; // наш настроенный axios-instance

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('/auth/login', {
          username: this.username,
          password: this.password
        });
        // Предположим, сервер возвращает { message, user, token }
        // Если токен не возвращается — доработайте бэкенд.
        localStorage.setItem('token', response.data.token);
        
        // Перенаправляем на список книг
        this.$router.push('/books');
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Ошибка входа';
      }
    }
  }
}
</script>
