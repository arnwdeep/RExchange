/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6B00",
          "orange-glow": "#FF8800",
          "orange-dark": "#CC5500",
          dark: "#0A090B",
          charcoal: "#141218",
          card: "#F7F4EB", // Vintage cream paper background from reference image
          ink: "#1A1918",
          blueink: "#182B49"
        }
      },
      fontFamily: {
        handwriting: ["'Caveat'", "'Patrick Hand'", "cursive"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      animation: {
        'sway': 'sway 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite'
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-1.5deg) translateY(0px)' },
          '50%': { transform: 'rotate(1.5deg) translateY(-4px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
