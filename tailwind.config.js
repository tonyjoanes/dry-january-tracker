/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'success': '#10B981',
        'warning': '#EF4444',
        'primary': '#3B82F6',
        'achievement': '#F59E0B',
      },
    },
  },
  plugins: [],
}
