module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false, // Disables Tailwind's base styles
  },
  important: '#__next', // Use a high-specificity selector for the app's root element
  theme: {
    extend: {},
  },
  plugins: [],
};