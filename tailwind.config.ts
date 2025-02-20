import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        sm: '2px 2px 4px rgba(0, 0, 0, 0.6)',
      },
      borderRadius: {
        "4xl": "1.75rem",
      },
      screens: {
        'custom': '1130px',
      },
      backgroundColor: {
        emerald: {
          50: '#FDF5EC',
          100: '#E6F6E7',
          200: '#B9E8C0',
          300: '#6EE7B7',
          400: '#34D399',
        }
      },
      fontFamily: {
        "my-font": ["Montserrat"],
      },
      colors: {
        primary: {
          "100": "var(--color-primary-100)",
          "200": "var(--color-primary-200)",
          "300": "var(--color-primary-300)",
          "400": "var(--color-primary-400)",
          "500": "var(--color-primary-500)",
          "600": "var(--color-primary-600)",
          "700": "var(--color-primary-700)",
          "800": "var(--color-primary-800)",
          "900": "var(--color-primary-900)",
        },
        success: {
          "100": "var(--color-success-100)",
          "500": "var(--color-success-500)",
          "600": "var(--color-success-600)",
          "700": "var(--color-success-700)",
        },
        warning: {
          "100": "var(--color-warning-100)",
          "500": "var(--color-warning-500)",
          "700": "var(--color-warning-700)",
          "800": "var(--color-warning-800)",
          "900": "var(--color-warning-900)",
        },
        error: {
          "100": "var(--color-error-100)",
          "500": "var(--color-error-500)",
          "700": "var(--color-error-700)",
        },
        info: {
          "100": "var(--color-info-100)",
          "500": "var(--color-info-500)",
          "700": "var(--color-info-700)",
        },
        gray: {
          "100": "var(--color-gray-100)",
          "500": "var(--color-gray-500)",
          "700": "var(--color-gray-200)",
        },
        secondary: {
            "100": "var(--color-secondary-100)",
            "200": "var(--color-secondary-200)",
            "300": "var(--color-secondary-300)",
            "500": "var(--color-secondary-500)",
            "600": "var(--color-secondary-600)",
            "700": "var(--color-secondary-700)",
            "800": "var(--color-secondary-800)",
            "900": "var(--color-secondary-900)",
          purple: {
            "500": "var(--color-secondary-purple-500)",
          },
        },
        neutral: {
          "000": "var(--color-neutral-000)",
          "100": "var(--color-neutral-100)",
          "200": "var(--color-neutral-200)",
          "300": "var(--color-neutral-300)",
          "400": "var(--color-neutral-400)",
          "500": "var(--color-neutral-500)",
          "600": "var(--color-neutral-600)",
          "700": "var(--color-neutral-700)",
          "800": "var(--color-neutral-800)",
          "900": "var(--color-neutral-900)",
          "1000": "var(--color-neutral-1000)",
        },
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
