import * as React from 'react';

export type ThemeAPI = {
  paddings: {
    lg: number | string;
    md: number | string;
    sm: number | string;
  };
  color: string;
  fontSize: number;
  componentSpecificConfigs: {
    [namespace: string]: any;
  };
};

export const defaultTheme: ThemeAPI = {
  paddings: {
    lg: '12px',
    md: '8px',
    sm: '4px',
  },
  color: 'blue',
  fontSize: 24,
  componentSpecificConfigs: {},
};

const context = {
  theme: defaultTheme,
  setIsThemeEditorOpen: (v: any) => {},
  isThemeEditorOpen: false,
  setColor: (c: string) => {},
  setFontSize: (fs: number) => {},
  registerComponentName: (name: string) => {},
  setComponentSpecificConfigs: (name: string, configs: any) => {},
  highlightedComponents: [] as string[],
  setHighlightedComponents: (v: string[]) => {},
};

export const ThemeContext = React.createContext(context);
