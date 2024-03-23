/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
export default {
  content: [
    'index.html',
    'src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        redf1: '#e10600',
        darkblue: '#1f1f27',
        background: '#fdefef',
        footer: '#f9cfcf',
        lightblue: '#f0ebf8',
        darktext: '#171717',
        lightdata: '#8c7e85',
        lightbluetext: '#7883bc'
      },
      fontFamily: {
        titillium: ['Titillium Web', 'sans-serif'],
        f1reg: ['F1-Regular', 'sans'],
        f1bold: ['F1-Bold', 'sans'],
        f1wide: ['F1-Wide', 'sans']
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
