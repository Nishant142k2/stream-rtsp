// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // if using React/Vite
      "./app/**/*.{js,ts,jsx,tsx}", // if using Next.js App Router
      "./pages/**/*.{js,ts,jsx,tsx}", // if using Next.js Pages Router
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  