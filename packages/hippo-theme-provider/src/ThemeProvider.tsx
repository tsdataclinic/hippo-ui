import * as React from 'react';
import type { Theme } from './types';
import { computeTheme } from './computeTheme';
import { ThemeDispatch, themeActionReducer } from './ThemeDispatch';
import {
  ThemeContext,
  ThemeOverrides,
  initThemeContextState,
  type ThemeConfig,
  type ComputedTheme,
} from './ThemeContext';

type Props = {
  children: React.ReactNode;
  theme?: ThemeConfig;
};

function computeComponentThemes(
  globalTheme: Theme,
  componentOverrides: { [componentName: string]: ThemeOverrides },
): { [componentName: string]: ComputedTheme } {
  const newComponentEntries = Object.entries(componentOverrides).map(
    ([componentName, themeOverrides]) => {
      return [componentName, computeTheme(globalTheme, themeOverrides)];
    },
  );

  return Object.fromEntries(newComponentEntries);
}

export function ThemeProvider({ children, theme }: Props): JSX.Element {
  const [themeContextState, dispatch] = React.useReducer(
    themeActionReducer,
    theme,
    initThemeContextState,
  );

  const { componentThemeOverrides, theme: globalTheme } = themeContextState;

  // whenever the global theme or component-specific overrides get updated, then
  // we should recompute the theme
  React.useEffect(() => {
    const computedGlobalTheme = computeTheme(globalTheme);
    const computedComponentThemes = computeComponentThemes(
      globalTheme,
      componentThemeOverrides,
    );
    dispatch({
      computedComponentThemes,
      computedGlobalTheme,
      type: 'COMPUTED_THEMES_UPDATE',
    });
  }, [globalTheme, componentThemeOverrides]);

  return (
    <>
      <ThemeDispatch.Provider value={dispatch}>
        <ThemeContext.Provider value={themeContextState}>
          {children}
        </ThemeContext.Provider>
      </ThemeDispatch.Provider>
    </>
  );
}
