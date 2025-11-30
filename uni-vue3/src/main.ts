import { createSSRApp } from "vue";
import App from "./App.vue";
import MyToast from "./components/my-toast/my-toast.vue";

export function createApp() {
  const app = createSSRApp(App);
  app.component('MyToast', MyToast);
  return {
    app,
  };
}
