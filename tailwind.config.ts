import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'sm': '100%',
        'md': '100%',
        'lg': '1024px',
        '2xl': '1280px'
      }
    },
    screens: {
      'xs': '360px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px'
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Premank Luxury Colors
        gold: {
          DEFAULT: 'hsl(var(--premank-gold))',
          light: 'hsl(var(--premank-gold-light))',
          dark: 'hsl(var(--premank-gold-dark))'
        },
        champagne: 'hsl(var(--premank-champagne))',
        ivory: 'hsl(var(--premank-ivory))',
        onyx: 'hsl(var(--premank-onyx))',
        platinum: 'hsl(var(--premank-platinum))',
        rose: 'hsl(var(--premank-rose))',
        emerald: 'hsl(var(--premank-emerald))',
        'dark-section': 'hsl(var(--premank-dark-section))'
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'ui-serif', 'Georgia']
      },
      fontSize: {
        'h1': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        'h2': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }], // 16px
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }] // 12px
      },
      spacing: {
        'xs': '0.5rem', // 8px
        'sm': '0.75rem', // 12px
        'md': '1rem', // 16px
        'lg': '1.5rem', // 24px
        'section': '1.5rem', // 24px
        'page': '2rem', // 32px
        'touch': '3rem' // 48px - minimum touch target
      },
      backgroundImage: {
        'gradient-luxury': 'var(--gradient-luxury)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-gold-shine': 'var(--gradient-gold-shine)',
        'gradient-diamond': 'var(--gradient-diamond)',
        'gradient-pearl': 'var(--gradient-pearl)',
        'gradient-royal': 'var(--gradient-royal)',
        'gradient-champagne': 'var(--gradient-champagne)',
        'gradient-hero': 'var(--gradient-hero)'
      },
      boxShadow: {
        luxury: 'var(--shadow-luxury)',
        gold: 'var(--shadow-gold)',
        'gold-intense': 'var(--shadow-gold-intense)',
        diamond: 'var(--shadow-diamond)',
        elegant: 'var(--shadow-elegant)',
        glow: 'var(--shadow-glow)',
        soft: 'var(--shadow-soft)',
        premium: 'var(--shadow-premium)'
      },
      borderRadius: {
        sm: '0.5rem', // 8px small
        DEFAULT: '0.75rem', // 12px medium
        md: '0.75rem', // 12px medium
        lg: '1rem', // 16px large
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      minHeight: {
        'touch': '3rem' // 48px - minimum button height
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        'shimmer': {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 50px hsl(var(--primary) / 0.6)' }
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' }
        },
        'diamond-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'diamond-spin': 'diamond-spin 2.5s linear infinite'
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'elegant': 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      letterSpacing: {
        'luxury': '0.15em',
        'wide-luxury': '0.25em'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
