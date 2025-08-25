import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
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
