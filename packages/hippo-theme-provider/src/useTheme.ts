import * as React from 'react';
import { ThemeContext, type ThemeContextState } from './ThemeContext';

/**
 * This hook returns a ThemeConfig object containing:
 * - `theme`: The global theme, including theme primitives and semantic values.
 * - `componentSpecificThemes`: Any component-specific theming. This only
 *   contains the semantic values to override for a component. Components cannot
 *   override primitive values. In other words, a Button can override that its
 *   'medium' spacing should be 's12' instead of 's4', but it cannot change the
 *   definition of 's12' or 's4'. Those primitive values can only be configured
 *   globally.
 * - `highlightedComponents`: An array of components that should be highlighted
 *   because they have been highlighted in the ThemeEditor. This is
 *   mostly for internal use only.
 * - `themeCache`: A map of component names to their computed themes by applying
 *   their overrides against the global theme. This is for internal use only.
 */
export function useTheme(): ThemeContextState {
  return React.useContext(ThemeContext);
}
