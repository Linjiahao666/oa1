/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        el: "var(--el-border-color)",
      },
    },
  },
  plugins: [],
};
