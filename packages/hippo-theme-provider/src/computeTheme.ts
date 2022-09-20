import type { ComputedTheme, ThemeOverrides } from './ThemeContext';
import type { Theme } from './types';

// TODO: clean up this function it's impossible to follow
export function computeTheme(
  theme: Theme,
  themeOverrides: ThemeOverrides = {},
): ComputedTheme {
  const { primitives, ...globalThemeWithoutPrimitives } = theme;
  const newComputedThemeEntries = Object.entries(
    globalThemeWithoutPrimitives,
  ).map(([themeCategory, semanticMappings]) => {
    // colors get special treatment
    if (themeCategory === 'colors') {
      const newColorEntries = Object.entries(
        semanticMappings as Theme['colors'],
      ).map(([semanticColorName, colorString]) => {
        const colorPrimitiveOrHex =
          themeOverrides.colors !== undefined
            ? themeOverrides.colors[
                semanticColorName as keyof Theme['colors']
              ] ?? colorString
            : colorString;

        const colorBaseName = colorPrimitiveOrHex.substring(
          0,
          colorPrimitiveOrHex.search(/[0-9]/),
        );

        // if the colorBaseName we extracted is in primitives.colors, then we know
        // it's a ColorPrimitive
        if (colorBaseName in primitives.colors) {
          return [
            semanticColorName,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (primitives.colors as any)[colorBaseName][colorPrimitiveOrHex],
          ];
        }

        // otherwise, assume it's a hex color and just return as is
        return [semanticColorName, colorPrimitiveOrHex];
      });

      return [themeCategory, Object.fromEntries(newColorEntries)];
    }

    // for all non-color themes, the conversion from semantic value to
    // computed value is a much easier lookup
    const newEntries = Object.entries(semanticMappings).map(
      ([semanticName, value]) => {
        // pick between the global value or the overridden semantic value
        const primitiveKeyOrValue =
          (themeOverrides as any)[themeCategory] !== undefined
            ? (themeOverrides as any)[themeCategory][semanticName] ?? value
            : value;

        let primitiveCategory = themeCategory;
        if (themeCategory === 'paddings') {
          primitiveCategory = 'spacings';
        }

        if (
          typeof primitiveKeyOrValue === 'string' &&
          primitiveKeyOrValue in (primitives as any)[primitiveCategory]
        ) {
          return [
            semanticName,
            (primitives as any)[primitiveCategory][primitiveKeyOrValue],
          ];
        }
        return [semanticName, primitiveKeyOrValue];
      },
    );
    return [themeCategory, Object.fromEntries(newEntries)];
  });

  return Object.fromEntries(newComputedThemeEntries);
}
