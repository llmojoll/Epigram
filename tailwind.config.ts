import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', 'sans-serif'],
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
    },
  },
};

export default config;
