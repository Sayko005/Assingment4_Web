<template>
  <div>
    <h2>Одобрение книг</h2>
    <button @click="fetchAllBooks">Загрузить все книги</button>
    <ul>
      <!-- Используем вычисляемое свойство для фильтрации -->
      <li v-for="book in unapprovedBooks" :key="book.id">
        "{{ book.title }}" (Сложность: {{ book.difficulty_level }})
        <button @click="approveBook(book.id)">Одобрить</button>
      </li>
    </ul>
    <p v-if="message" style="color:green">{{ message }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from '@/axios';

export default {
  name: 'ApproveBooksView',
  setup() {
    const books = ref([]);
    const message = ref('');

    // Вычисляемое свойство: фильтруем только не одобренные книги
    const unapprovedBooks = computed(() => books.value.filter(book => !book.approved));

    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('/books/all');
        books.value = res.data;
      } catch (error) {
        console.error('Ошибка загрузки книг:', error);
      }
    };

    const approveBook = async (bookId) => {
      try {
        const res = await axios.post(`/books/${bookId}/approve`);
        message.value = res.data.message;
        fetchAllBooks(); // Обновляем список
      } catch (error) {
        console.error('Ошибка одобрения:', error);
      }
    };

    return { books, message, fetchAllBooks, approveBook, unapprovedBooks };
  }
};
</script>
