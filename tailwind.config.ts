import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	screens: {
		sm: '640px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
		xxl: '1536px'
	},
	fontFamily: {
		primary: 'var(--font-jetbrainsmono)',
		oldEnglish: ['Old English Text MT', 'serif'],
    	blackletter: ['UnifrakturCook', 'cursive'],
		hennypenny: ['Henny Penny', 'cursive'],
		Bigelow_Rules: ['Bigelow Rules', 'cursive'],
	},
  	extend: {
  		animation: {
  			flicker: 'flicker 0.2s infinite alternate'
  		},
  		keyframes: {
  			flicker: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0.3'
  				}
  			}
  		},
  		colors: {
			primary: '#f4f1eb',
			primaryDark: '#b58e64',
			textPrimary: '#8b5f40',
			textPrimaryDark: '#d1b28b',
			borderPrimary: '#7a6c5d',
			borderSecondary: '#453422',
			borderPrimaryDark: '#d3c6b1',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
