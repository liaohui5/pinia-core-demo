import { createApp } from "vue";
import router from "@/router";
import store from "@/store";
import App from "@/App";

const app = createApp(App);
const globalPlugins = [
  /* 全局插件 */
  router,
  store,
];
for (const plugin of globalPlugins) {
  app.use(plugin);
}

app.mount("#app");
