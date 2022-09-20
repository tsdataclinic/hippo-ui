import type { Theme } from './types';
import { defaultThemePrimitives } from './defaultThemePrimitives';

export const defaultTheme: Theme = {
  borderWidths: {
    none: 0,
    soft: 1,
    hard: 2,
  },

  borderRadiuses: {
    none: 0,
    small: 2,
    normal: 4,
    medium: 6,
    large: 8,
  },

  colors: {
    background: 'slate50',
    error: 'red600',
    primary: 'blue600',
    secondary: 'teal500',
    success: 'green500',
    text: 'slate900',
    warning: 'amber500',
  },
  /*
  fontSizes: {
    base: 'base',
    h1: 't3xl',
    h2: 't2xl',
    h3: 'xl',
    paragraph: 'base',
  },
  paddings: {
    huge: 's6',
    large: 's4',
    medium: 's2',
    small: 's1',
    tiny: 's0.5',
  },
  */
  fontSizes: {
    base: {
      fontSize: 16,
      lineHeight: '1.5rem',
    },
    h1: {
      fontSize: 32,
      lineHeight: '2.25rem',
    },
    h2: {
      fontSize: 24,
      lineHeight: '2rem',
    },
    h3: {
      fontSize: 18,
      lineHeight: '1.75rem',
    },
    paragraph: {
      fontSize: 16,
      lineHeight: '1.5rem',
    },
  },
  paddings: {
    huge: 24,
    large: 16,
    medium: 8,
    small: 4,
    tiny: 2,
  },
  primitives: defaultThemePrimitives,
};
