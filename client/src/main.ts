import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import VueGtag  from 'vue-gtag-next'


const app = createApp(App);

app.use(VueGtag, {
    property: { id: import.meta.env.VITE_GTAG }
})

app.mount('#app')
