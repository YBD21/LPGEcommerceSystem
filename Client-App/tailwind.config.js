/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: "shake 1s infinite ease-in-out",
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateY(0) rotate(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateY(-2.5px) rotate(-0.5deg)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateY(2.5px) rotate(0.5deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
