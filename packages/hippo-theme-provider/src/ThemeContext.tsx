import * as React from 'react';

export type ThemeAPI = {
  paddings: {
    lg: number;
    md: number;
    sm: number;
  };
};

const defaultTheme: ThemeAPI = {
  paddings: {
    lg: 8,
    md: 4,
    sm: 2,
  },
};

export const ThemeContext = React.createContext(defaultTheme);
