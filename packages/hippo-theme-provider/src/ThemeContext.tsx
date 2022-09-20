import * as React from 'react';
import type {
  FontSizeDefinition,
  CSSDimension,
  HexColor,
  Theme,
} from './types';
import { defaultTheme } from './defaultTheme';
import { computeTheme } from './computeTheme';

export type ThemeWithoutPrimitives = Omit<Theme, 'primitives'>;
export type ThemeAttribute = keyof ThemeWithoutPrimitives;

// this helper type makes all nested objects into Partials
type RecursivePartial<Obj> = {
  [K in keyof Obj]?: RecursivePartial<Obj[K]>;
};

export type ThemeOverrides = RecursivePartial<ThemeWithoutPrimitives>;

// Helper type to map each theme category to what its final computed value should be.
type ComputedThemeTypes = {
  borderRadiuses: CSSDimension;
  borderWidths: CSSDimension;
  colors: HexColor;
  fontSizes: FontSizeDefinition;
  paddings: CSSDimension;
};

/**
 * A theme object consisting only of computed values.
 * Any references to theme primitives have been resolved and turned into their
 * corresponding CSS value (e.g. 's4' has been turned into '1rem').
 */
export type ComputedTheme = {
  [Attribute in keyof ThemeWithoutPrimitives]: {
    [K in keyof ThemeWithoutPrimitives[Attribute]]: ComputedThemeTypes[Attribute];
  };
};

export type ThemeConfig = {
  // TODO: components should be able to define their own schemas instead of
  // being treated as Theme overrides.
  // E.g. a button should be able to define its own schema with a 'buttonBorder'
  // key, or 'successFontColor' key, and the user points these to semantic theme
  // values. They should also be allowed to point these to primitive values too,
  // if there isn't a suitable semantic value. Or even pick a custom value.
  // The semantic editor and primitives editor are still global, but the component
  // specific editor uses the component schema registered via a hook, not the
  // theme's semantic spec.
  componentThemeOverrides: {
    [componentName: string]: ThemeOverrides;
  };

  // TODO: this holds a lot of duplicate data. We need to store and compute
  // less.
  computedComponentThemes: {
    [componentName: string]: ComputedTheme;
  };

  // TODO: rename this to `theme` and keep `ComputedTheme` type
  computedTheme: ComputedTheme;

  // TODO: rename this to `themeSpec` and change type name to `ThemeSpec`
  theme: Theme;
};

export type ThemeContextState = ThemeConfig & {
  highlightedComponents: readonly string[];
};

export const defaultThemeContext: ThemeContextState = {
  componentThemeOverrides: {},
  computedComponentThemes: {},
  computedTheme: computeTheme(defaultTheme),
  highlightedComponents: [],
  theme: defaultTheme,
};

export function initThemeContextState(
  initialThemeConfig: ThemeConfig | undefined,
): ThemeContextState {
  if (initialThemeConfig === undefined) {
    return defaultThemeContext;
  }

  return {
    ...defaultThemeContext,
    ...initialThemeConfig,
  };
}

export const ThemeContext =
  React.createContext<ThemeContextState>(defaultThemeContext);
