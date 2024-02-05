/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // override styles in tailwind
    container: {
        padding: {
            md: "10rem"
        },
    },
  },
  plugins: [],
}

