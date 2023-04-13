/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'background-Login': "url('./src/assets/banner.jpg')"
      }
    },
    colors: {
      orange: '#F7452E',
      white: '#fff',
      blackWhite: '#F5F5F5',
      black: '#000',
      DFDFDF: '#DFDFDF',
      footer: '#FBFBFB',
      blue: '#77CCF3',
      yellow: '#FFFF00',
      FBEBED: '#FBEBED',
      FFCD95: '#FFCD95',
      chatbot6: '#eee',
      overflow:"#f8fafc",
      backgroundLogin: 'rgb(249,240,235)',
      colorInput: ' #1dbfaf'
    },
    translate: {
      '001': '-50%'
    },
    screens: {
      lg:{min:'1024px'},
       ls: { max: '1023px' },
      // md: { max: '767px' },
      // sm: { max: '639px' }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
