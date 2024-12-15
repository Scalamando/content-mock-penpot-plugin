import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia"
import { loadIcons } from "@iconify/vue"
import { sendMessage } from "./utils"

loadIcons([
  "feather:zap",
  "feather:download",
  "feather:file-plus",
  "feather:settings",
  "feather:trash",
  "feather:plus-square",
  "feather:repeat",
])

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

sendMessage({ type: "load" })

app.mount("#app")
