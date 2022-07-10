module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,jtx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
