// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // 폰트
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'], // 기본
        iropke: ['var(--font-iropke)', 'serif'],
      },
      fontSize: {
        '3xl': ['32px', '42px'],
        '2xl': ['24px', '32px'],
        xl: ['20px', '32px'],
        '2lg': ['18px', '26px'],
        lg: ['16px', '26px'],
        md: ['14px', '24px'],
        sm: ['13px', '22px'],
        xs: ['12px', '18px'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      // 색상
      colors: {
        black: {
          100: '#F9F9F9',
          200: '#6B6B6B',
          300: '#5E5E5E',
          400: '#525252',
          500: '#454545',
          600: '#373737',
          700: '#373737',
          800: '#373737',
          900: '#373737',
          950: '#373737',
        },
        blue: {
          100: '#FFFFFF',
          200: '#ECEFF4',
          300: '#CBD3E1',
          400: '#ABB8CE',
          500: '#8B9DBC',
          600: '#6A82A9',
          700: '#52698E',
          800: '#40516E',
          900: '#2D394E',
          950: '#1A212D',
        },
        background: {
          gray: '#F5F7FA',
        },
        state: {
          danger: '#FF6577',
          gray100: '#DEDEDE',
          gray200: '#C4C4C4',
          gray300: '#ABABAB',
          gray400: '#919191',
        },
        line: {
          100: '#F2F2F2',
          200: '#CFDBEA',
        },
        illustration: {
          yellow: '#FBC85B',
          green: '#48BB98',
          purple: '#8E80E3',
          blue: '#5195EE',
          red: '#E46E80',
          brown: '#9A695E',
          gold: '#E8AA26',
          darkGray: '#3E3E3E',
          gray1: '#3E414D',
          gray2: '#494D59',
          blueLight: '#C7D1E0',
          blueLighter: '#E3E9F1',
          blueLightest: '#EFF3F8',
        },
      },
    },
  },
};

export default config;
