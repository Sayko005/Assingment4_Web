<template>
  <div>
    <h1>Геймифицированная библиотека (Vue 3)</h1>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/books">Книги</router-link> |
      <router-link to="/upload">Загрузить книгу</router-link> |
      <router-link to="/approve">Одобрить (Админ)</router-link>

      <!-- Условное отображение кнопок -->
      <span v-if="isAuthenticated">
        | <router-link to="/profile">Профиль</router-link>
        | <a href="#" @click.prevent="logout">Выйти</a>
      </span>
      <span v-else>
        | <router-link to="/login">Войти</router-link>
        | <router-link to="/signup">Регистрация</router-link>
      </span>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(!!localStorage.getItem('user')); // Проверяем наличие user при загрузке

    const logout = () => {
      localStorage.removeItem('user'); // Удаляем пользователя
      isAuthenticated.value = false; // Обновляем состояние
      router.push('/login'); // Перенаправляем на страницу входа
    };

    // Проверяем аутентификацию при монтировании
    onMounted(() => {
      isAuthenticated.value = !!localStorage.getItem('user');
    });

    return {
      isAuthenticated,
      logout
    };
  }
};
</script>
