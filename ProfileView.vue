<template>
  <div>
    <h2>Профиль пользователя</h2>
    <p v-if="user">Добро пожаловать, {{ user.username }}!</p>
    <p v-else>Нет информации о пользователе.</p>
    <!-- Здесь можно добавить дополнительные данные или настройки профиля -->
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null
    };
  }
};
</script>
