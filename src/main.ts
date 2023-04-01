import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import "/node_modules/reveal.js/dist/reveal.css"
import "/node_modules/reveal.js/dist/theme/black.css"

const app = createApp(App)

app.mount('#app')
