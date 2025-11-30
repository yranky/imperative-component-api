import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UniViteRootInjector from 'vite-plugin-uniapp-injector';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 10003
  },
  plugins: [
    //https://github.com/SanshanStreet/vite-plugin-uniapp-injector
    UniViteRootInjector({
      components: {
        MyToast: '<MyToast ref="myToastRef"></MyToast>',
      } as const,
    }),
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        importers: [
        ],
      },
    }
  }
});
