/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ĐEN: Dùng cho tiêu đề và chữ chính để cực kỳ rõ nét
        'primary': {
          900: '#1a1a1a', // Đen than (Rich Black)
          800: '#333333',
        },
        // VÀNG: Điểm nhấn thương hiệu, nút bấm
        'accent': {
          500: '#fbbf24', // Vàng ấm (Amber)
          600: '#f59e0b',
        },
        // XANH NHẸ: Dùng làm màu nền section, khối nội dung (giúp web thanh thoát)
        'secondary': {
          50: '#f0f9ff',  // Xanh da trời cực nhẹ (Sky blue tint)
          100: '#e0f2fe',
          600: '#0ea5e9', // Xanh để dùng cho icon hoặc link
        }
      }
    },
  },
  plugins: [],
}
