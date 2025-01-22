import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "IhDynamicTable",
      fileName: (format) => `ih-dynamic-table.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    // To include `index.html` in the output
    assetsInlineLimit: 0, // This ensures assets are not inlined and are copied to the output directory
    outDir: "dist", // Ensure the build output goes to the 'dist' directory
    emptyOutDir: true, // Clean up the output directory before build
    // You can optionally include the public directory
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, "src/main.tsx"),
//       name: "IhDynamicTable",
//       fileName: (format) => `ih-dynamic-table.${format}.js`,
//     },
//     rollupOptions: {
//       external: ["react", "react-dom"],
//       output: {
//         globals: {
//           react: "React",
//           "react-dom": "ReactDOM",
//         },
//       },
//     },
//   },
// });

// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";

// // export default defineConfig({
// //   build: {
// //     lib: {
// //       entry: "src/main.tsx", // Main entry for your library
// //       name: "IHDynamicTable",
// //       fileName: (format) => `index.${format}.js`,
// //     },
// //     rollupOptions: {
// //       external: ["react", "react-dom"], // Exclude peer dependencies
// //       output: {
// //         globals: {
// //           react: "React",
// //           "react-dom": "ReactDOM",
// //         },
// //       },
// //     },
// //   },
// //   plugins: [react()],
// // });

// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
