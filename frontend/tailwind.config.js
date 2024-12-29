/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPinkDark: '#793E37',
        customPinkMedium: '#974E44',
        customPinkLight: '#B55D51',
        customPinkPale: '#FFF0ED',
        customGrayDark: '#4C4C4C',
        customGrayMedium: '#878787',
        customGrayLight: '#A5A5A5',
        customGrayPale: '#EBEBEB',
        customWhite: '#FFFFFF',
        customBlack: '#000000',
        hotPink:'#db2777',
        lightPink:'#ffecf4',
        mediumPink:'#ffc6c9 ',
        brightPink: '#ff007f',
        darkPink:'#fd5d69',
        primaryPink: '#dc2777'
      },
      keyframes: {
        customPulse: {
          '0%, 100%': { backgroundColor: '#e0e0e0' },
          '50%': { backgroundColor: '#c0c0c0' },
        },
      },
      animation: {
        customPulse: 'customPulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#dc2777',
          'primary-focus': '#bb2066',
          'primary-content': '#ffffff',
        },
      },
    ],
  },
}
