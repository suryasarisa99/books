import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        "favicon.ico",
        "logo.png",
        "assets/logo.png",
        "assets/img1.jpg",
        "bank.png",
        "register2.png",
        "home/img1.jpg",
        "home/img2.png",
        "home/img3a.jpg",
        "home/img3b.jpg",
        "home/img3c.jpg",
        "home/img4.jpg",
      ],
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      // manifest: false,
      manifest: {
        name: "books3",
        short_name: "books3",
        description: "My Awesome App description",
        start_url: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#000000",
        icons: [
          {
            src: "/vite.svg",
            sizes: "512x512",
            // type: "image/png",
            type: "image/svg+xml",
          },
          {
            src: "/vite.svg",
            sizes: "144x144",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  server: {
    host: "192.168.0.169",
    port: 4444,
  },
});
