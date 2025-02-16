<template>
  <div>
    <h2>Загрузить книгу</h2>
    <form @submit.prevent="uploadBook">
      <div>
        <label>Название:</label>
        <input v-model="title" />
      </div>
      <div>
        <label>Автор:</label>
        <input v-model="author" />
      </div>
      <div>
        <label>Сложность:</label>
        <input type="number" v-model.number="difficulty_level" />
      </div>
      <div>
        <label>PDF файл:</label>
        <input type="file" @change="onFileChange" />
      </div>
      <button type="submit">Загрузить</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color:green">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'UploadBookView',
  data() {
    return {
      title: '',
      author: '',
      difficulty_level: 1,
      file: null,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async uploadBook() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          this.errorMessage = 'Сначала авторизуйтесь.';
          return;
        }

        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('author', this.author);
        formData.append('difficulty_level', this.difficulty_level);
        formData.append('added_by', user.id);
        formData.append('pdfFile', this.file);

        const res = await axios.post('/books/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.successMessage = res.data.message;
        // Сброс полей
        this.title = '';
        this.author = '';
        this.difficulty_level = 1;
        this.file = null;
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Ошибка при загрузке книги';
      }
    }
  }
}
</script>
