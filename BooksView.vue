<template>
  <div>
    <h1>Список книг</h1>
    <button @click="fetchBooks">Обновить</button>
    <ul>
      <li v-for="book in books" :key="book.id">
        "{{ book.title }}" - {{ book.author }}
        <span>(Сложность: {{ book.difficulty_level }})</span>
      </li>
    </ul>

    <h2>Добавить книгу</h2>
    <form @submit.prevent="addBook">
      <div>
        <label>Название:</label>
        <input v-model="newBook.title" />
      </div>
      <div>
        <label>Автор:</label>
        <input v-model="newBook.author" />
      </div>
      <div>
        <label>Сложность:</label>
        <input type="number" v-model.number="newBook.difficulty_level" />
      </div>
      <button type="submit">Добавить</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  name: 'BooksView',
  data() {
    return {
      books: [],
      newBook: {
        title: '',
        author: '',
        difficulty_level: 1
      },
      errorMessage: ''
    }
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await axios.get('/books');
        this.books = res.data;
      } catch (error) {
        this.errorMessage = 'Ошибка при получении списка книг';
      }
    },
    async addBook() {
      try {
        const user = JSON.parse(localStorage.getItem('user')); 
        // Или как-то иначе определяем ID текущего пользователя

        // Учтите, что в вашем бэкенде поле называется "added_by"
        await axios.post('/books', {
          title: this.newBook.title,
          author: this.newBook.author,
          difficulty_level: this.newBook.difficulty_level,
          added_by: user?.id || 1 // временно
        });
        alert('Книга добавлена (ожидает одобрения).');
        // Очищаем форму
        this.newBook.title = '';
        this.newBook.author = '';
        this.newBook.difficulty_level = 1;
        // Обновляем список
        this.fetchBooks();
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Ошибка при добавлении книги';
      }
    }
  }
}
</script>
