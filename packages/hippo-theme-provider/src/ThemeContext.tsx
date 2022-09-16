import * as React from 'react';

export type ThemeAPI = {
  paddings: {
    lg: number;
    md: number;
    sm: number;
  };
  color: string;
  fontSize: number;
  componentSpecificConfigs: {
    [namespace: string]: any;
  };
};

export const defaultTheme: ThemeAPI = {
  paddings: {
    lg: 8,
    md: 4,
    sm: 2,
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
