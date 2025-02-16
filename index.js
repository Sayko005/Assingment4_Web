import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import BooksView from '@/views/BooksView.vue';
import UploadBookView from '@/views/UploadBookView.vue';
import ApproveBooksView from '@/views/ApproveBooksView.vue';
import ReadBookView from '@/views/ReadBookView.vue';
import ProfileView from '@/views/ProfileView.vue'; // новый компонент профиля

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/books', name: 'books', component: BooksView },
  { path: '/upload', name: 'upload', component: UploadBookView },
  { path: '/approve', name: 'approve', component: ApproveBooksView },
  { path: '/read/:bookId', name: 'read', component: ReadBookView, props: true },
  { path: '/profile', name: 'profile', component: ProfileView }  // новый маршрут
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
