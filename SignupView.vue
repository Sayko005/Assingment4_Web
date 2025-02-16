<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="handleSignup">
      <div>
        <label>Имя пользователя:</label>
        <input v-model="username" />
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  name: 'SignupView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleSignup() {
      try {
        const response = await axios.post('/auth/signup', {
          username: this.username,
          password: this.password
        });
        alert(response.data.message);
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Ошибка регистрации';
      }
    }
  }
}
</script>
