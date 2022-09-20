import * as React from 'react';
import { assertUnreachable } from '@hippo/utils';
import type {
  ColorBaseName,
  ColorPrimitive,
  FontSizePrimitive,
  SpacingPrimitive,
  FontSizeDefinition,
  HexColor,
  CSSDimension,
} from './types';
import type { ThemeContextState, ComputedTheme } from './ThemeContext';

export type ThemeAction =
  | {
      colorPrimitive: ColorPrimitive;
      colorValue: HexColor;
      type: 'PRIMITIVE_COLOR_UPDATE';
    }
  | {
      fontSizeDefinition: FontSizeDefinition;
      fontSizePrimitive: FontSizePrimitive;
      type: 'PRIMITIVE_FONT_SIZE_UPDATE';
    }
  | {
      spacingPrimitive: SpacingPrimitive;
      spacingValue: CSSDimension;
      type: 'PRIMITIVE_SPACING_UPDATE';
    }
  | {
      borderWidthName: string;
      borderWidthValue: CSSDimension;
      componentName: string | undefined;
      type: 'THEME_BORDER_WIDTH_UPDATE';
    }
  | {
      borderRadiusName: string;
      borderRadiusValue: CSSDimension;
      componentName: string | undefined;
      type: 'THEME_BORDER_RADIUS_UPDATE';
    }
  | {
      color: ColorPrimitive | HexColor;
      colorSemanticName: string;
      componentName: string | undefined;
      type: 'THEME_COLOR_UPDATE';
    }
  | {
      componentName: string | undefined;
      paddingName: string;
      paddingValue: SpacingPrimitive | CSSDimension;
      type: 'THEME_PADDING_UPDATE';
    }
  | {
      componentName: string | undefined;
      fontSizeName: string;
      fontSizeValue: FontSizePrimitive | FontSizeDefinition;
      type: 'THEME_FONT_SIZE_UPDATE';
    }
  | {
      componentName: string;
      type: 'COMPONENT_REGISTER';
    }
  | {
      computedComponentThemes: { [componentName: string]: ComputedTheme };
      computedGlobalTheme: ComputedTheme;
      type: 'COMPUTED_THEMES_UPDATE';
    }
  | {
      highlightedComponents: readonly string[];
      type: 'HIGHLIGHTED_COMPONENTS_SET';
    };

export function themeActionReducer(
  state: ThemeContextState,
  action: ThemeAction,
): ThemeContextState {
  const { componentThemeOverrides, theme } = state;

  switch (action.type) {
    case 'PRIMITIVE_FONT_SIZE_UPDATE':
      return {
        ...state,
        theme: {
          ...theme,
          primitives: {
            ...theme.primitives,
            fontSizes: {
              ...theme.primitives.fontSizes,
              [action.fontSizePrimitive]: action.fontSizeDefinition,
            },
          },
        },
      };

    case 'PRIMITIVE_COLOR_UPDATE': {
      // we are receiving a color primitive of the form 'orange300', so we have to extract
      // the color base name first to know which object to update
      const { colorPrimitive, colorValue } = action;
      const colorBaseName = colorPrimitive.substring(
        0,
        colorPrimitive.search(/[0-9]/),
      );

      // now that we know the color base name, we can update the objects
      if (colorBaseName in theme.primitives.colors) {
        return {
          ...state,
          theme: {
            ...theme,
            primitives: {
              ...theme.primitives,
              colors: {
                ...theme.primitives.colors,
                [colorBaseName]: {
                  ...theme.primitives.colors[colorBaseName as ColorBaseName],
                  [colorPrimitive]: colorValue,
                },
              },
            },
          },
        };
      }
      return state;
    }

    case 'PRIMITIVE_SPACING_UPDATE':
      return {
        ...state,
        theme: {
          ...theme,
          primitives: {
            ...theme.primitives,
            spacings: {
              ...theme.primitives.spacings,
              [action.spacingPrimitive]: action.spacingValue,
            },
          },
        },
      };

    case 'THEME_BORDER_RADIUS_UPDATE': {
      if (action.componentName) {
        return {
          ...state,
          componentThemeOverrides: {
            ...componentThemeOverrides,
            [action.componentName]: {
              ...componentThemeOverrides[action.componentName],
              borderRadiuses: {
                ...componentThemeOverrides[action.componentName].borderRadiuses,
                [action.borderRadiusName]: action.borderRadiusValue,
              },
            },
          },
        };
      }

      return {
        ...state,
        theme: {
          ...theme,
          borderRadiuses: {
            ...theme.borderRadiuses,
            [action.borderRadiusName]: action.borderRadiusValue,
          },
        },
      };
    }

    case 'THEME_BORDER_WIDTH_UPDATE': {
      if (action.componentName) {
        return {
          ...state,
          componentThemeOverrides: {
            ...componentThemeOverrides,
            [action.componentName]: {
              ...componentThemeOverrides[action.componentName],
              borderWidths: {
                ...componentThemeOverrides[action.componentName].borderWidths,
                [action.borderWidthName]: action.borderWidthValue,
              },
            },
          },
        };
      }

      return {
        ...state,
        theme: {
          ...theme,
          borderWidths: {
            ...theme.borderWidths,
            [action.borderWidthName]: action.borderWidthValue,
          },
        },
      };
    }

    case 'THEME_PADDING_UPDATE': {
      if (action.componentName) {
        return {
          ...state,
          componentThemeOverrides: {
            ...componentThemeOverrides,
            [action.componentName]: {
              ...componentThemeOverrides[action.componentName],
              paddings: {
                ...componentThemeOverrides[action.componentName].paddings,
                [action.paddingName]: action.paddingValue,
              },
            },
          },
        };
      }

      return {
        ...state,
        theme: {
          ...theme,
          paddings: {
            ...theme.paddings,
            [action.paddingName]: action.paddingValue,
          },
        },
      };
    }

    case 'THEME_FONT_SIZE_UPDATE': {
      if (action.componentName) {
        return {
          ...state,
          componentThemeOverrides: {
            ...componentThemeOverrides,
            [action.componentName]: {
              ...componentThemeOverrides[action.componentName],
              fontSizes: {
                ...componentThemeOverrides[action.componentName].fontSizes,
                [action.fontSizeName]: action.fontSizeValue,
              },
            },
          },
        };
      }

      return {
        ...state,
        theme: {
          ...theme,
          fontSizes: {
            ...theme.fontSizes,
            [action.fontSizeName]: action.fontSizeValue,
          },
        },
      };
    }

    case 'THEME_COLOR_UPDATE': {
      if (action.componentName) {
        return {
          ...state,
          componentThemeOverrides: {
            ...componentThemeOverrides,
            [action.componentName]: {
              ...componentThemeOverrides[action.componentName],
              colors: {
                ...componentThemeOverrides[action.componentName].colors,
                [action.colorSemanticName]: action.color,
              },
            },
          },
        };
      }

      return {
        ...state,
        theme: {
          ...theme,
          colors: {
            ...theme.colors,
            [action.colorSemanticName]: action.color,
          },
        },
      };
    }

    case 'COMPONENT_REGISTER':
      // register the component if it hasn't already been added
      if (!(action.componentName in componentThemeOverrides)) {
        return {
          ...state,
          componentThemeOverrides: {
            ...componentThemeOverrides,
            [action.componentName]: {},
          },
        };
      }
      return state;

    case 'HIGHLIGHTED_COMPONENTS_SET':
      return {
        ...state,
        highlightedComponents: action.highlightedComponents,
      };

    case 'COMPUTED_THEMES_UPDATE':
      return {
        ...state,
        computedComponentThemes: action.computedComponentThemes,
        computedTheme: action.computedGlobalTheme,
      };
    default:
      assertUnreachable(action);
  }
}

export const ThemeDispatch = React.createContext<React.Dispatch<ThemeAction>>(
  () => undefined,
);
