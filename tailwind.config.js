/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Đổi mã màu ở đây, toàn bộ web sẽ đổi theo
        'primary': {
          50: '#f0f7ff',
          600: '#0066cc', // Màu xanh thương hiệu chính
          900: '#004d99', // Màu xanh đậm heading
        },
        'accent': {
          500: '#ffc107', // Màu vàng icon/button
        }
      },
      fontFamily: {
        // Đổi tên font ở đây để áp dụng cho toàn web
        'sans': ['Inter', 'Roboto', 'sans-serif'], 
        'heading': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
