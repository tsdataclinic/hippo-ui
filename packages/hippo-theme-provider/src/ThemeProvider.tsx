import * as React from 'react';
import { defaultTheme, type ThemeAPI, ThemeContext } from './ThemeContext';

type Props = {
  children: React.ReactNode;
  theme?: ThemeAPI;
};

const removeConfigFromAllComponentConfigs = (
  componentSpecificConfigs: any,
  toRemoveConfigName: string,
): Record<string, any> => {
  const componentNames = [...Object.keys(componentSpecificConfigs)];
  return componentNames.reduce((obj, name) => {
    const configs = componentSpecificConfigs[name];
    delete configs[toRemoveConfigName];
    obj[name] = configs;
    return obj;
  }, {} as any);
};

export function ThemeProvider({ children, theme }: Props): JSX.Element {
  const [themeOverrides, setThemeOverrides] = React.useState<Partial<ThemeAPI>>(
    {},
  );
  const [highlightedComponents, setHighlightedComponents] = React.useState<
    string[]
  >([]);

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme: { ...(theme ?? defaultTheme), ...themeOverrides },
          setColor: color => {
            setThemeOverrides(v => ({
              ...v,
              color,
              componentSpecificConfigs: removeConfigFromAllComponentConfigs(
                v.componentSpecificConfigs,
                'color',
              ),
            }));
          },
          setFontSize: fontSize => {
            setThemeOverrides(v => ({
              ...v,
              fontSize,
              componentSpecificConfigs: removeConfigFromAllComponentConfigs(
                v.componentSpecificConfigs,
                'fontSize',
              ),
            }));
          },
          setPadding: (
            paddingType: 'sm' | 'md' | 'lg',
            paddingVal: number | string,
          ) => {
            setThemeOverrides(v => {
              const newPaddings = {
                ...(v.paddings ?? defaultTheme.paddings),
                [paddingType]: paddingVal,
              };

              return {
                ...v,
                paddings: newPaddings,
              };
            });
          },
          registerComponentName: componentName => {
            setThemeOverrides(v => ({
              ...v,
              componentSpecificConfigs: {
                ...v.componentSpecificConfigs,
                [componentName]: {},
              },
            }));
          },
          setComponentSpecificConfigs: (
            componentName: string,
            configs: any,
          ) => {
            setThemeOverrides(v => ({
              ...v,
              componentSpecificConfigs: {
                ...v.componentSpecificConfigs,
                [componentName]: {
                  ...(v.componentSpecificConfigs
                    ? v.componentSpecificConfigs[componentName]
                    : {}),
                  ...configs,
                },
              },
            }));
          },
          setHighlightedComponents,
          highlightedComponents,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </>
  );
}
