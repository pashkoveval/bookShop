import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import './assets/style.scss';
import 'virtual:uno.css'
import '@unocss/reset/normalize.css';
import App from './App.vue';

createApp(App).use(router).use(createPinia()).mount('#app');
