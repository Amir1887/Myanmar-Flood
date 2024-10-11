/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:{
          light: '#3AB0FF', 
          DEFAULT: '#1E3A8A', 
          dark: '#1E2A5A',    
        }
      }
    },
  },
  plugins: [],
}

