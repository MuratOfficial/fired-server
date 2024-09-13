import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  keyframes: {
			rotate: {
			  '0%': { transform: 'rotate(0deg)' },
			  '100%': { transform: 'rotate(360deg)' },
			},
			shapeChange: {
				'0%, 100%': { rx: '0', ry: '0', fill: '#3b82f6' },
				'25%': { rx: '50', ry: '50', fill: '#10b981' },
				'50%': { rx: '25', ry: '25', fill: '#f59e0b'  },
				'75%': { rx: '75', ry: '75', fill: '#ef4444' },
			  },
			 
		  },
		  animation: {
			rotate: 'rotate 4s linear infinite',
			shapeChange: 'shapeChange 4s ease-in-out infinite',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
