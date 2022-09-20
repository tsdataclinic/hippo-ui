import * as React from 'react';
import { ThemeDispatch, type ThemeAction } from './ThemeDispatch';

/**
 * This hook returns the `dispatch` function to update the ThemeContextState.
 * This hook is only for internal use by the ThemeEditor component to update
 * the app's theme.
 */
export function useThemeDispatch(): React.Dispatch<ThemeAction> {
  return React.useContext(ThemeDispatch);
}
