import { createApp } from 'vue';
import App from './App.vue';
import store from './store';  // ✅ Import store
import router from './router';

const app = createApp(App);
app.use(store);  // ✅ Register Vuex store
app.use(router);
app.mount('#app');
