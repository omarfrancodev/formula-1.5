/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html',
    'src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.js',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      redF1: '#E10600',
      secondaryDark: '#1F1F27',
      main: '#fdefef',
      footer: '#F9CFCF',
      tables: '#F0EBF8',
      mainText: '#171717',
      textData: '#A09099'
    }
  },
  plugins: ['flowbite/plugin']
}
