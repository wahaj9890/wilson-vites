import { createApp } from 'vue'
import './assets/scss/main.scss'
import './style.css'
import App from './App.vue'
import store from './store/index'
import router from "./router/index"
import * as filters from "./utils/filters"
import { createMsalPlugin } from "./msalplugin"
import i18n from "./i18ns/i18n"
import { eventBus } from "./utils/eventBus"
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const app = createApp(App);
// app.use(createMsalPlugin())
app.use(i18n)
app.use(Toast);

app.config.globalProperties.$msalInstance = {};
app.config.globalProperties.$eventBus = eventBus;
app.use(router).use(store).mount('#app')
