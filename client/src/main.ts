import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { config, configure } from "vue-gtag"


configure({
    tagId: import.meta.env.VITE_GTAG,
})

createApp(App).mount('#app')
