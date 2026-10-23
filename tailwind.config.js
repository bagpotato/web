const c = (n) => `rgb(var(--${n}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { bg: c('bg'), fg: c('fg'), mute: c('mute'), line: c('line'), card: c('card') },
      fontFamily: { sans: ['Geist', 'system-ui', 'sans-serif'] }
    }
  }
};
