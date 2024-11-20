// vite.config.ts
import { defineConfig } from "file:///F:/OneDrive/Documents/Programming/Adonis/BuddyScript_Backend/node_modules/vite/dist/node/index.js";
import adonisjs from "file:///F:/OneDrive/Documents/Programming/Adonis/BuddyScript_Backend/node_modules/@adonisjs/vite/build/src/client/main.js";
var vite_config_default = defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ["resources/css/app.css", "resources/js/app.js"],
      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ["resources/views/**/*.edge"]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUHJvZ3JhbW1pbmdcXFxcQWRvbmlzXFxcXEJ1ZGR5U2NyaXB0X0JhY2tlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxQcm9ncmFtbWluZ1xcXFxBZG9uaXNcXFxcQnVkZHlTY3JpcHRfQmFja2VuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovT25lRHJpdmUvRG9jdW1lbnRzL1Byb2dyYW1taW5nL0Fkb25pcy9CdWRkeVNjcmlwdF9CYWNrZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBhZG9uaXNqcyBmcm9tICdAYWRvbmlzanMvdml0ZS9jbGllbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBhZG9uaXNqcyh7XG4gICAgICAvKipcbiAgICAgICAqIEVudHJ5cG9pbnRzIG9mIHlvdXIgYXBwbGljYXRpb24uIEVhY2ggZW50cnlwb2ludCB3aWxsXG4gICAgICAgKiByZXN1bHQgaW4gYSBzZXBhcmF0ZSBidW5kbGUuXG4gICAgICAgKi9cbiAgICAgIGVudHJ5cG9pbnRzOiBbJ3Jlc291cmNlcy9jc3MvYXBwLmNzcycsICdyZXNvdXJjZXMvanMvYXBwLmpzJ10sXG5cbiAgICAgIC8qKlxuICAgICAgICogUGF0aHMgdG8gd2F0Y2ggYW5kIHJlbG9hZCB0aGUgYnJvd3NlciBvbiBmaWxlIGNoYW5nZVxuICAgICAgICovXG4gICAgICByZWxvYWQ6IFsncmVzb3VyY2VzL3ZpZXdzLyoqLyouZWRnZSddLFxuICAgIH0pLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1gsU0FBUyxvQkFBb0I7QUFDL1ksT0FBTyxjQUFjO0FBRXJCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS1AsYUFBYSxDQUFDLHlCQUF5QixxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUs1RCxRQUFRLENBQUMsMkJBQTJCO0FBQUEsSUFDdEMsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
