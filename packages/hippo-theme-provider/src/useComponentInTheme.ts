import * as React from 'react';
import type { ComputedTheme } from './ThemeContext';
import { computeTheme } from './computeTheme';
import { useTheme } from './useTheme';
import { useThemeDispatch } from './useThemeDispatch';

/**
 * This hook is used to register a component so it can be recognized by the
 * ThemeProvider and the ThemeEditor. Calling this hook in a component will
 * allow a component to be editable by the ThemeEditor UI.
 *
 * In addition to registering this component in the ThemeProvider, this hook
 * also returns:
 * - `componentTheme`: The new theme with the component's overrides (if any)
 *   applied
 * - `isHighlighted`: Whether or not this component is being highlighted in the
 *   ThemeEditor UI. This is mostly for internal use.
 */
export function useComponentInTheme(componentName: string): {
  componentTheme: ComputedTheme;
  isHighlighted: boolean;
} {
  const dispatch = useThemeDispatch();
  const { computedComponentThemes, highlightedComponents, theme } = useTheme();
  const highlightedComponentsSet = React.useMemo(
    () => new Set(highlightedComponents),
    [highlightedComponents],
  );

  // TODO: we've only added this for Storybook compatibility, because in Storybook
  // we don't have access to the `computedComponentThemes` in Context.
  // think of how to refactor.
  const computedBaseTheme = React.useMemo(() => computeTheme(theme), [theme]);

  React.useEffect(() => {
    dispatch({
      componentName,
      type: 'COMPONENT_REGISTER',
    });
  }, [componentName, dispatch]);

  if (computedComponentThemes[componentName]) {
    return {
      componentTheme: computedComponentThemes[componentName],
      isHighlighted: highlightedComponentsSet.has(componentName),
    };
  }

  return {
    componentTheme: computedBaseTheme,
    isHighlighted: highlightedComponentsSet.has(componentName),
  };
}
