/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'source-serif': ['Source Serif Pro', 'serif']
      },
      colors: {
        'primary': '#6DE1A7',
        'primary-dark': '#47D990',
        'primary-light': '#93E9BE',
        'secondary': '#F6C324',
        'secondary-dark': '#E3AE09',
        'secondary-light': '#F8CF50',
        
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
