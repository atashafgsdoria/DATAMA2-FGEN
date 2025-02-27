import { createApp } from 'vue';
import store from './store'; // ✅ Import Vuex store
import App from './App.vue';

createApp(App).use(store).mount('#app');
