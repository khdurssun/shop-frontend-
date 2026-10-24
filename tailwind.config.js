/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        brand: {
          50: "#f5f7ff", 100: "#e9edff", 200: "#cdd5ff", 300: "#a6b4ff",
          400: "#7b8dff", 500: "#5363ff", 600: "#3d45f5", 700: "#2f34d6",
          800: "#2a2fac", 900: "#282d87"
        }
      },
      boxShadow: {
        soft: "0 2px 16px rgba(17,24,39,.06)",
        lift: "0 12px 32px rgba(17,24,39,.10)"
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-500px 0" }, "100%": { backgroundPosition: "500px 0" } }
      },
      animation: {
        fade: "fadeIn .3s ease-out",
        slide: "slideUp .35s ease-out",
        shimmer: "shimmer 1.4s infinite linear"
      }
    }
  },
  plugins: []
};