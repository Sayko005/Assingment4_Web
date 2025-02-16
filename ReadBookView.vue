<template>
  <div @wheel="handleWheel">
    <h2>Чтение книги</h2>

    <div v-if="pdfPath">
      <!-- Отображение PDF с привязкой к текущей странице -->
      <iframe
        :src="`${serverUrl}${pdfPath}#page=${currentPage}`"
        width="600"
        height="800"
        frameborder="0">
      </iframe>
    </div>

    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '@/axios';
import { ref } from 'vue';

export default {
  name: 'ReadBookView',
  props: ['bookId'],
  setup(props) {
    const pdfPath = ref(''); // Путь к PDF-файлу
    const currentPage = ref(1); // Текущая страница
    const errorMessage = ref(''); // Сообщение об ошибке
    const serverUrl = 'http://localhost:5000/'; // URL сервера

    // Получение текущего прогресса и пути к PDF
    const fetchProgress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Получение текущего пользователя
        if (!user) {
          errorMessage.value = 'Сначала авторизуйтесь.';
          return;
        }

        // Получаем путь к PDF
        const pdfRes = await axios.get(`/books/${props.bookId}/pdf`, {
          params: { user_id: user.id }
        });
        pdfPath.value = pdfRes.data.pdfPath;

        // Получаем текущий прогресс
        const progressRes = await axios.get(`/books/${props.bookId}/progress`, {
          params: { user_id: user.id }
        });
        currentPage.value = progressRes.data.current_page || 1; // Если прогресса нет, начинаем с 1 страницы
      } catch (error) {
        errorMessage.value = error.response?.data?.error || 'Ошибка загрузки книги.';
      }
    };

    // Сохранение текущей страницы
    const saveProgress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.post(`/books/${props.bookId}/progress`, {
          user_id: user.id,
          current_page: currentPage.value
        });
      } catch (error) {
        console.error('Ошибка сохранения прогресса:', error);
      }
    };

    // Обработчик колесика мыши
    const handleWheel = async (event) => {
      if (event.deltaY > 0) {
        currentPage.value += 1; // Прокрутка вниз → следующая страница
      } else if (event.deltaY < 0 && currentPage.value > 1) {
        currentPage.value -= 1; // Прокрутка вверх → предыдущая страница
      }
      await saveProgress(); // Сохраняем прогресс
    };

    // Загружаем данные при открытии страницы
    fetchProgress();

    return {
      pdfPath,
      currentPage,
      errorMessage,
      handleWheel,
      serverUrl
    };
  }
};
</script>

<style>
/* Отключаем стандартную прокрутку iframe */
iframe {
  overflow: hidden;
}
</style>
